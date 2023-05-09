import { IconType } from "react-icons/lib";

export interface Student {
  id: number;
  enrollNumber: string;
  firstName: string;
  surnames: string;
  fullName: string;
  semester: number;
  birthdate: Date | string;
  email: string;
  gender: string;
  phoneNumber: string;
  address: string;
}

export interface Columns {
  Header: string;
  accessor: string;
  inputType: "text" | "number" | "date";
  icon: JSX.Element;
}

export interface Columns {
  Header: string;
  accessor: string;
  inputType: "text" | "number" | "date";
  icon: JSX.Element;
}
