import express, { Request, Response } from "express";
import ErrorMsg from "../enum/ErrorMsg";
import SuccessMsg from "../enum/SuccessMsg";
import { ProductModel, ProductWithStoreModel } from "../lib/types";
import Product from "../model/Product";
import Store from "../model/Store";
import {
  createOrUpdateProduct,
  makeAttendenceSheet,
} from "../business/ProductBusiness";
const auth = require("../middleware/auth");

const productController = express.Router();

productController.get("/", auth, async (req: Request, res: Response) => {
  try {
    const filters = req.body.filters;
    const products = await Product.findAll({ where: filters });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: ErrorMsg.PRODUCT_FETCHED,
      error: error.message,
    });
  }
});

productController.get("/excel", auth, async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const products = await Product.findAll({
      where: filters,
    });
    makeAttendenceSheet(products, res);
  } catch (error) {
    return res.status(500).json({
      message: ErrorMsg.PRODUCT_FETCHED,
      error: error.message,
    });
  }
});

productController.post("/", auth, async (req: Request, res: Response) => {
  try {
    const product = req.body as ProductWithStoreModel;
    createOrUpdateProduct(product, res);
  } catch (error) {
    return res.status(500).json({
      message: ErrorMsg.PRODUCT_REGISTERED_UPDATED,
      error: error.message,
    });
  }
});

productController.delete("/", auth, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.query.id.toString());
    await Product.destroy({ where: { id: id } });
    return res.status(200).json({ message: SuccessMsg.PRODUCT_DELETED });
  } catch (error) {
    return res
      .status(500)
      .json({ message: ErrorMsg.PRODUCT_DELETED, error: error.message });
  }
});

export default productController;
