export interface Student {
  id: string;
  enrollNumber: string;
  firstName: string;
  surnames: string;
  fullName: string;
  semester: string;
  birthdate: string;
  email: string;
  gender: string;
  phoneNumber: string;
  address: string;
  alergies?: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  pass: string;
  role: string;
  address: string;
}

export interface Product {
  id: number;
  address: string;
  store: {
    id: number;
    name: string;
  };
}

export interface Visitor {
  id: number;
  recordId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  birthdate: Date;
  age: number;
  birthState: string;
}

export interface Filter {
  name: string;
  value: string | Date | number;
  active: boolean;
}

export interface Validation<Type> {
  accessor: keyof Type;
  header: string;
  inputType: "text" | "number" | "date";
  icon: JSX.Element;
  required: Boolean;
  isVisibleOnTable: boolean;
  isOnForm: boolean;
}

export interface GenericAttributes {
  Header: string;
  icon: JSX.Element;
  isVisibleOnTable: Boolean;
  accessor: string;
  inputType: "text" | "number" | "date";
  required: boolean;
}

export interface GenericField {
  name: string;
  inputType: "text" | "number" | "date";
  required: Boolean;
  value: string | number | Date;
}

export type Test<Type> = {
  name: keyof Type;
  value: string;
};
