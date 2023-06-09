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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storeId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  { timestamps: true, createdAt: false, updatedAt: false }
);

Product.hasOne(Store, {
  foreignKey: {
    allowNull: false,
    name: "store_id",
  },
  onDelete: "RESTRICT",
});

Store.belongsTo(Product);

export default Product;
