import { DataTypes } from "sequelize";
import sequalize from "../lib/db";
import { ProductModel } from "../lib/types";

const Product = sequalize.define<ProductModel>(
  "Product",
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "product_name",
    },
    storeName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "store_name",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "store_address",
    },
  },
  {
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,

  }
);

export default Product;
