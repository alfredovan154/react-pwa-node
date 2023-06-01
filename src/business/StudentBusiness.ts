import { Response } from "express";
import ExcelJS from "exceljs";
import path from "path";
import { Templates } from "../enum/Templates";
import { StudentModel } from "../lib/types";

export const makeAttendenceSheet = async (
  students: Array<StudentModel>,
  res: Response
) => {
  const outputPath = path.resolve(__dirname, "/../tmp/", "output1.xlsx");

  const workbook = new ExcelJS.Workbook();
  const ws = workbook.addWorksheet("Attendence");
  const rows = students.map((s, index) => [index, s.enrollNumber, s.fullName]);
  ws.addTable({
    name: "Attendence_sheet",
    ref: "A3",
    headerRow: true,
    totalsRow: true,
    style: {
        theme: "TableStyleLight15"
    },
    columns: [
      { name: "#", filterButton: true },
      { name: "Expediente", filterButton: true },
      { name: "Nombre completo", filterButton: true },
    ],
    rows: rows,
  });
  await workbook.xlsx.writeFile(outputPath);
  return res.sendFile(outputPath);
};
