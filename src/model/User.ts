import { DataTypes } from "sequelize";
import sequalize from "../lib/db";
import { StudentModel, UserModel } from "../lib/types";

const User = sequalize.define<UserModel>(
  "Users",
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, createdAt: false, updatedAt: false }
);

export default User;