import {
  DataTypes
} from "sequelize";
import sequalize from "../lib/db";
import { StudentModel } from "../lib/types";

const Student = sequalize.define<StudentModel>(
  "Student",
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    enrollNumber: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    surnames: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semester: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true, createdAt: false, updatedAt: false }
);

export default Student;
