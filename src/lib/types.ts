import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<number>;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  pass: string;
  role: string;
  address: string;
}

export interface StoreModel
  extends Model<
    InferAttributes<StoreModel>,
    InferCreationAttributes<StoreModel>
  > {
  id: CreationOptional<number>;
  name: string;
  address: string;
}

export interface ProductModel
  extends Model<
    InferAttributes<ProductModel>,
    InferCreationAttributes<ProductModel>
  > {
  id: CreationOptional<number>;
  productName: string;
  storeId: number;
}

export interface VisitorModel
  extends Model<
    InferAttributes<VisitorModel>,
    InferCreationAttributes<VisitorModel>
  > {
  id: CreationOptional<number>;
  recordId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  birthdate: Date;
  age: number;
  birthState: string;
}

export interface ProductWithStoreModel extends ProductModel {
  Store: StoreModel;
}