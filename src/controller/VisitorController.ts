import express, { Request, Response } from "express";
import ErrorMsg from "../enum/ErrorMsg";
import SuccessMsg from "../enum/SuccessMsg";
import Visitor from "../model/Visitor";
import { VisitorModel } from "../lib/types";
import Store from "../model/Store";
const auth = require("../middleware/auth");

const visitorController = express.Router();

visitorController.get("/", auth, async (req: Request, res: Response) => {
  try {
    const filters = req.body.filters;
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

visitorController.post("/", auth, async (req: Request, res: Response) => {
  try {
    const visitor = req.body as VisitorModel;
    if (visitor.id == null) {
      await Visitor.update(visitor, { where: { id: visitor.id } });
      return res.status(200).json({ message: SuccessMsg.VISITOR_UPDATED });
    } else {
      await Visitor.create(visitor);
      return res.status(200).json({ message: SuccessMsg.VISITOR_CREATED });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: ErrorMsg.VISITOR_UPDATED, error: error.message });
  }
});

visitorController.delete("/:id", auth, async (req: Request, res: Response) => {
  try {
    await Visitor.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: SuccessMsg.VISITOR_DELETED });
  } catch (error) {
    return res
      .status(500)
      .json({ message: ErrorMsg.VISITOR_DELETED, error: error.message });
  }
});

export default visitorController;
