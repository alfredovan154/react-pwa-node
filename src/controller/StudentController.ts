import express, { Request, Response } from "express";
import Student from "../model/Student";
import ErrorMsg from "../enum/ErrorMsg";
import SucessMsg from "../enum/SuccessMsg";
const auth = require("../middleware/auth");
import { makeAttendenceSheet } from "../business/StudentBusiness";
import { StudentModel } from "../lib/types";
const studentController = express.Router();

studentController.get("/", auth, async (req: Request, res: Response) => {
  try {
    const filters = req.body.filters;
    const students = await Student.findAll({ where: filters });
    return res.status(200).json(students);
  } catch (error) {
    return res
      .status(500)
      .json({ message: ErrorMsg.STUDENTS_FETCHED, error: error });
  }
});

studentController.get(
  "/attendence_sheet",
  async (req: Request, res: Response) => {
    try {
      const filters = req.body.filters;
      const students = await Student.findAll({ where: filters });
      makeAttendenceSheet(students, res);
    } catch (error) {
      return res
        .status(500)
        .json({ message: ErrorMsg.STUDENTS_FETCHED, error: error });
    }
  }
);

studentController.post("/", auth, async (req: Request, res: Response) => {
  try {
    if (req.body.id != null) {
      await Student.update(req.body, {
        where: {
          id: req.body.id,
        },
      });
      return res.status(200).json({
        message: SucessMsg.STUDENT_UPDATED,
      });
    } else {
      await Student.create(req.body);
      return res.status(200).json({
        message: SucessMsg.STUDENT_CREATED,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: ErrorMsg.STUDENT_REGISTERED, error: error.message });
  }
});

studentController.patch("/", async (req: Request, res: Response) => {});

studentController.delete("/", async (req: Request, res: Response) => {});

export default studentController;
