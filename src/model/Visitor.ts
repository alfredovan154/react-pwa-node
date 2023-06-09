import { DataTypes } from "sequelize";
import sequalize from "../lib/db";
import { VisitorModel } from "../lib/types";

const Visitor = sequalize.define<VisitorModel>("Visitor", {
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey: true,
  },
  recordId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
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
  birth_state: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default Visitor;
