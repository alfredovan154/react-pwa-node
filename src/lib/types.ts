import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface StudentModel
  extends Model<
    InferAttributes<StudentModel>,
    InferCreationAttributes<StudentModel>
  > {
  id: CreationOptional<number>;
  enrollNumber: number;
  firstName: string;
  surnames: string;
  fullName: string;
  semester: number;
  birthdate: Date;
  email: string;
  gender: string;
  phoneNumber: string;
  address: string;
}

export interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<number>;
  email: string;
  password: string;
}

