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
    storeName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "store_name"
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "store_address"
    },
  },
  {
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

export default Store;
