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
}

export interface GenericFormFields {
  name: string;
  value: string | null;
  inputType: "text" | "number" | "date";
  icon: JSX.Element;
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
}