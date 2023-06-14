import express, { Request, Response } from "express";
import ErrorMsg from "../enum/ErrorMsg";
import SuccessMsg from "../enum/SuccessMsg";
import Visitor from "../model/Visitor";
import { VisitorModel } from "../lib/types";
import {
  makeAttendenceSheet,
  createOrUpdateVisitor,
} from "../business/VisitorBusiness";
const auth = require("../middleware/auth");

const visitorController = express.Router();

visitorController.get("/", auth, async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const visitors = await Visitor.findAll({
      where: filters,
    });
    return res.status(200).json(visitors);
  } catch (error) {
    return res.status(500).json({
      message: ErrorMsg.VISITORS_FETCHED,
      error: error.message,
    });
  }
});

visitorController.get("/excel", auth, async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const visitors = await Visitor.findAll({
      where: filters,
    });
    makeAttendenceSheet(visitors, res);
  } catch (error) {
    return res.status(500).json({
      message: ErrorMsg.VISITORS_FETCHED,
      error: error.message,
    });
  }
});

visitorController.post("/", auth, async (req: Request, res: Response) => {
  try {
    const visitor = req.body as VisitorModel;
    createOrUpdateVisitor(visitor, res);
  } catch (error) {
    return res
      .status(500)
      .json({ message: ErrorMsg.VISITOR_UPDATED, error: error.message });
  }
});

visitorController.delete("/", auth, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.query.id.toString())
    await Visitor.destroy({ where: { id: id } });
    return res.status(200).json({ message: SuccessMsg.VISITOR_DELETED });
  } catch (error) {
    return res
      .status(500)
      .json({ message: ErrorMsg.VISITOR_DELETED, error: error.message });
  }
});

export default visitorController;
