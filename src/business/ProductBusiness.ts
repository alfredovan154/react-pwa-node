import { Response } from "express";
import { ProductModel, ProductWithStoreModel, StoreModel, VisitorModel } from "../lib/types";
import path from "path";
import { Templates } from "../enum/Templates";
import ExcelJS from "exceljs";
import ErrorMsg from "../enum/ErrorMsg";
import SuccessMsg from "../enum/SuccessMsg";
import Product from "../model/Product";

export const createOrUpdateVisitor = async (
    product: ProductModel,
    res: Response
  ) => {
    if (product != null) {

    } else {
      return res.status(500).json({ message: ErrorMsg.PRODUCT_REGISTERED_UPDATED });
    }
    if (product.id != null) {
      await Product.update(product, { where: { id: product.id } });
      return res.status(200).json({ message: SuccessMsg.PRODUCT_UPDATED });
    } else {
      await Product.create(product);
      return res.status(200).json({ message: SuccessMsg.PRODUCT_CREATED });
    }
  };

export const makeAttendenceSheet = async (
    products: Array<ProductWithStoreModel>,
    res: Response
  ) => {
    const outputPath = path.resolve(__dirname, "/../tmp/", "output1.xlsx");
    const templatePath = path.resolve(
      __dirname,
      "./../document/",
      Templates.PRODUCTS_SHEET
    );
  
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(templatePath).then(async () => {
      const ws = workbook.getWorksheet("Productos");
      const rows = products.map((p, index) => [
        index,
        p.productName,
        p.Store.storeName,
        p.Store.address,
      ]);
      ws.addTable({
        name: "Attendence_sheet",
        ref: "A6",
        headerRow: true,
        totalsRow: false,
        style: {
          theme: "TableStyleLight15",
        },
        columns: [
          { name: "#", filterButton: true },
          { name: "Producto", filterButton: true },
          { name: "Tienda", filterButton: true },
          { name: "Dirección", filterButton: true },
        ],
        rows: rows,
      });
      await workbook.xlsx.writeFile(outputPath);
      return res.download(outputPath);
    });
  };
  