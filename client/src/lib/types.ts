import { IconType } from "react-icons/lib";

export interface Student {
  expediente: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string;
  nombre_completo: string;
  semestre: number;
  fecha_nacimiento: Date | string;
  email: string;
  genero: string;
  telefono: string;
}

export interface Columns {
  Header: string;
  accessor: string;
  inputType: "text" | "number" | "date";
  icon: JSX.Element;
}
