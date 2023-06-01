import { IconType } from "react-icons/lib";
import {
  IoCalendar,
  IoCallOutline,
  IoKeypad,
  IoMail,
  IoPerson,
  IoSearch,
} from "react-icons/io5";

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

export interface GenericFormFields {
  name: string;
  value: string | Date | number | null;
  inputType: "text" | "number" | "date" | "phone";
  icon: JSX.Element;
}

export interface GenericAttributes {
  Header: string;
  icon: JSX.Element;
  isVisibleOnTable: Boolean;
  accessor: string;
  inputType: "text" | "number" | "date" | "phone";
  required: boolean;
}

export interface GenericField {
  name: string;
  inputType: "text" | "number" | "date";
  required: Boolean;
  value: string | number | Date;

}