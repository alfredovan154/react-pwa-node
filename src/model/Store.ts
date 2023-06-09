import { DataTypes } from "sequelize";
import sequalize from "../lib/db";
import { StoreModel } from "../lib/types";

const Store = sequalize.define<StoreModel>(
  "Store",
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, createdAt: false, updatedAt: false }
);

export default Store;
