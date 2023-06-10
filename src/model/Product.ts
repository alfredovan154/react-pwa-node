import { DataTypes } from "sequelize";
import sequalize from "../lib/db";
import { ProductModel } from "../lib/types";
import Store from "./Store";

const Product = sequalize.define<ProductModel>(
  "Product",
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "product_name",
    },
    storeId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "store_id",
    },
  },
  {
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

Product.belongsTo(Store, { foreignKey: "storeId" });

export default Product;
