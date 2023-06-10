import { DataTypes } from "sequelize";
import sequalize from "../lib/db";
import { VisitorModel } from "../lib/types";

const Visitor = sequalize.define<VisitorModel>(
  "Visitor",
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    recordId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "record_id"
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
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    age: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    birthState: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "birth_state"
    },
  },
  {
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

export default Visitor;
