import { Response, response } from "express";
import ExcelJS from "exceljs";
import path from "path";
import { Templates } from "../enum/Templates";
import { VisitorModel } from "../lib/types";
import Visitor from "../model/Visitor";
import SuccessMsg from "../enum/SuccessMsg";
import crypto from "crypto";
import env from "../lib/env";
import ErrorMsg from "../enum/ErrorMsg";
import hbs from "hbs";
import util from "util";
import fs from "fs";
const child_process = require("child_process");
const ReadFile = util.promisify(fs.readFile);

const _MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;
const hash = crypto.createHmac("sha256", env.SECRET_CRYPTO);

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

export const makeAttendenceSheet = async (visitors: Array<VisitorModel>) => {
  const options = {
    format: "A4",
  };
  const templatePath = path.resolve(__dirname, "../views/visitor.hbs");
  const cwd = path.resolve(__dirname, "../../tmp/");
  const content = await ReadFile(templatePath, "utf8");
  const template = hbs.handlebars.compile(content);

  visitors.splice(290).forEach((visitor) => {
    //const browser = await puppeteer.launch();
    //const page = await browser.newPage();
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
        child_process.exec(
          `wkhtmltopdf ./${visitor.id}.html ./${visitor.id}.pdf`,
          {
            cwd: cwd,
            shell: "/bin/bash",
          }
        );
      }
    });
  });
};

export const makeZipAndClean = (res: Response) => {
  const cwd = path.resolve(__dirname, "../../tmp/");
  child_process.execSync(`zip ${today} *.pdf`, {
    cwd: cwd,
    shell: "/bin/bash",
  });
  child_process.execSync(`rm *.html *.pdf`, {
    cwd: cwd,
    shell: "/bin/bash",
  });

  res.status(200).json({ code: 200, mesage: "xd" });
};
