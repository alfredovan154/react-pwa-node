import { DataTypes } from "sequelize";
import sequalize from "../lib/db";
import { UserModel } from "../lib/types";

const User = sequalize.define<UserModel>(
  "User",
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name"
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name"
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "full_name"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

export default User;
