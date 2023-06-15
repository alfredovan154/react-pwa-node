import express, { Request, Response } from "express";
import ErrorMsg from "../enum/ErrorMsg";
import SuccessMsg from "../enum/SuccessMsg";
import { ProductModel, ProductWithStoreModel } from "../lib/types";
import Product from "../model/Product";
import Store from "../model/Store";
import {
  createOrUpdateVisitor,
  makeAttendenceSheet,
} from "../business/ProductBusiness";
const auth = require("../middleware/auth");

const productController = express.Router();

productController.get("/", auth, async (req: Request, res: Response) => {
  try {
    const filters = req.body.filters;
    const products = await Product.findAll({
      where: filters,
      include: [{ model: Store, required: true }],
    });
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
      include: [{ model: Store, required: true }],
    });
    makeAttendenceSheet(products as Array<ProductWithStoreModel>, res);
  } catch (error) {
    return res.status(500).json({
      message: ErrorMsg.PRODUCT_FETCHED,
      error: error.message,
    });
  }
});

productController.post("/", auth, async (req: Request, res: Response) => {
  try {
    const product = req.body as ProductModel;
    if (product.id == null) {
      await Product.update(product, { where: { id: product.id } });
      return res.status(200).json({ message: SuccessMsg.PRODUCT_UPDATED });
    } else {
      await Product.create(product);
      return res.status(200).json({ message: SuccessMsg.PRODUCT_CREATED });
    }
  } catch (error) {
    return res.status(500).json({
      message: ErrorMsg.PRODUCT_REGISTERED_UPDATED,
      error: error.message,
    });
  }
});

productController.delete("/:id", auth, async (req: Request, res: Response) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: SuccessMsg.PRODUCT_DELETED });
  } catch (error) {
    return res
      .status(500)
      .json({ message: ErrorMsg.PRODUCT_DELETED, error: error.message });
  }
});

export default productController;
