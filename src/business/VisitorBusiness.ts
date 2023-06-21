import { Response, response } from "express";
import path from "path";
import { VisitorModel } from "../lib/types";
import Visitor from "../model/Visitor";
import SuccessMsg from "../enum/SuccessMsg";
import crypto from "crypto";
import env from "../lib/env";
import ErrorMsg from "../enum/ErrorMsg";
import hbs from "hbs";
import transporter from "../lib/transporter";
import util from "util";
import fs from "fs";
const child_process = require("child_process");
const ReadFile = util.promisify(fs.readFile);

const _MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;
const hash = crypto.createHmac("sha256", env.SECRET_CRYPTO);
const cwd = path.resolve(__dirname, "../../tmp/");

const today = new Date().toLocaleDateString("en-GB").replace(/\//g, "-");

export const createOrUpdateVisitor = async (
  visitor: VisitorModel,
  res: Response
) => {
  if (visitor != null) {
    const today = new Date();
    const birthdate = new Date(visitor.birthdate);
    visitor.age = Math.floor(
      Math.abs(today.getTime() - birthdate.getTime()) / _MS_PER_YEAR
    );
    visitor.fullName = `${visitor.firstName} ${visitor.lastName}`;
  } else {
    return res
      .status(500)
      .json({ message: ErrorMsg.VISITOR_REGISTERED_UPDATED });
  }
  if (visitor.id != null) {
    await Visitor.update(visitor, { where: { id: visitor.id } });
    return res.status(200).json({ message: SuccessMsg.VISITOR_UPDATED });
  } else {
    visitor.recordId = hash
      .update(visitor.birthState + visitor.fullName)
      .digest("hex")
      .substring(0, 10);
    await Visitor.create(visitor);
    return res.status(200).json({ message: SuccessMsg.VISITOR_CREATED });
  }
};

export const makeAttendenceSheet = async(visitors: Array<VisitorModel>) => {
    const templatePath = path.resolve(__dirname, "../views/visitor.hbs");
    const content = await ReadFile(templatePath, "utf8");
    const template = hbs.handlebars.compile(content);

    visitors.splice(280).forEach((visitor) => {
      const data = {
        generalData: {
          invoice_id: visitor.id + visitor.recordId,
          creation_date: today,
        },
        visitorData: [
          { attribute: "Expediente", data: visitor.recordId },
          { attribute: "Nombre", data: visitor.firstName },
          { attribute: "Apellidos", data: visitor.lastName },
          { attribute: "Nombre completo", data: visitor.fullName },
          { attribute: "Correo", data: visitor.email },
          { attribute: "Estado", data: visitor.birthState },
          { attribute: "Fecha de nacimiento", data: visitor.birthdate },
        ],
      };
      fs.writeFile(`tmp/${visitor.id}.html`, template(data), function (err) {
        if (err) {
          return console.log(err);
        } else {
          makePDF(visitor).then(() => {
            child_process.exec(`rm ./${visitor.id}.html`, {
              cwd: cwd,
              shell: "/bin/bash",
            });
          });
        }
      });
    });
};

const makePDF = (visitor: VisitorModel) => {
  return new Promise((resolve, reject) => {
    child_process.exec(
      `wkhtmltopdf ./${visitor.id}.html ./${visitor.id}.pdf`,
      {
        cwd: cwd,
        shell: "/bin/bash",
      },
      (error: any) => {
        if (error) {
          reject(error);
        }
        resolve("resolved");
      }
    );
  });
};

export const zipPDF = () => {
  return new Promise((resolve, reject) => {
    child_process.exec(
      `zip ${today} *pdf`,
      {
        cwd: cwd,
        shell: "/bin/bash",
      },
      (error: any) => {
        if (error) {
          reject(error);
        }
        resolve("resolved");
      }
    );
  });
};

export const sendZipPDF = async (email: string) => {
  const filepath = path.resolve(cwd + `/${today}.zip`);
  const mailOptions = {
    from: env.EMAIL_USERNAME,
    to: email,
    subject: "Fichas terminadas",
    text: "Se hicieron las fichas correctamente. Extrae el zip para verlas.",
    attachments: [
      {
        filename: "fichas.zip",
        path: filepath,
      },
    ],
  };

  let mailInfo = await transporter.sendMail(mailOptions, () =>
    console.log(mailInfo)
  );
};

export const cleanTmp = () => {
  child_process.execSync(`rm *.*`, {
    cwd: cwd,
    shell: "/bin/bash",
  });
};
