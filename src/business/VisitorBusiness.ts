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

const _MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;
const hash = crypto.createHmac("sha256", env.SECRET_CRYPTO);

export const createOrUpdateVisitor = async (
  visitor: VisitorModel,
  res: Response
) => {
  if (visitor != null) {
    const today = new Date();
    const birthdate = new Date(visitor.birthdate);
    visitor.age = Math.floor(Math.abs(today.getTime() - birthdate.getTime()) / _MS_PER_YEAR);
    visitor.fullName = `${visitor.firstName} ${visitor.lastName}`;
  } else {
    return res.status(500).json({ message: ErrorMsg.VISITOR_REGISTERED_UPDATED });
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

export const makeAttendenceSheet = async (
  visitors: Array<VisitorModel>,
  res: Response
) => {
  const outputPath = path.resolve(__dirname, "/../tmp/", "output1.xlsx");
  const templatePath = path.resolve(
    __dirname,
    "./../document/",
    Templates.VISITORS_SHEET
  );

  const workbook = new ExcelJS.Workbook();
  workbook.xlsx.readFile(templatePath).then(async () => {
    const ws = workbook.getWorksheet("Visitantes");
    const rows = visitors.map((s, index) => [
      index,
      s.recordId,
      s.firstName,
      s.lastName,
      s.fullName,
      s.email,
      s.birthdate,
      s.age,
      s.birthState,
    ]);
    ws.addTable({
      name: "Attendence_sheet",
      ref: "A10",
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleLight15",
      },
      columns: [
        { name: "#", filterButton: true },
        { name: "Expediente", filterButton: true },
        { name: "Nombre", filterButton: true },
        { name: "Apellidos", filterButton: true },
        { name: "Nombre completo", filterButton: true },
        { name: "Email", filterButton: true },
        { name: "Fecha de nacimiento", filterButton: true },
        { name: "Edad", filterButton: true },
        { name: "Estado", filterButton: true },
      ],
      rows: rows,
    });
    await workbook.xlsx.writeFile(outputPath);
    return res.download(outputPath);
  });
};
