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
  productName: string;
  storeId: number;
  "Store.id": number;
  "Store.storeName": string;
  "Store.address": string;
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

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
];

type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : "";

type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : "";
