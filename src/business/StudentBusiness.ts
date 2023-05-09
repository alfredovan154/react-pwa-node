import express, { Request, Response } from "express";
import { Model } from "sequelize";
import xlsx from "xlsx";
import path from "path";
import { Templates } from "../enum/Templates";
import { StudentModel } from "../lib/types";

export const makeAttendenceSheet = async (
  students: Array<StudentModel>,
  res: Response
) => {
  const filePath = path.join("src/", "resources/", "Templates.xlsx");
  const outputPath = path.resolve(__dirname, "/../tmp/", "output.xlsx");
  const workbook = xlsx.readFile(filePath, { cellStyles: true });
  const attendenceSheet = workbook.Sheets[Templates.ATTENDENCE_SHEET];

  const rows = students.map((s, index) => [index, s.enrollNumber, s.fullName]);
  xlsx.utils.sheet_add_aoa(attendenceSheet, rows, { origin: "A6" });
  xlsx.writeFile(workbook, outputPath, { compression: true });
  return res.sendFile(outputPath);
};
