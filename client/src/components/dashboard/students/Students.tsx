import React from "react";
import GenericTable from "../generic_table/GenericTable";
import Filters from "../filters/Filters";
import { makeStudents } from "@/lib/makeData";
import {
  IoCalendar,
  IoCallOutline,
  IoKeypad,
  IoMail,
  IoPerson,
  IoSearch,
} from "react-icons/io5";
import "@/css/Component.css";
import { Columns } from "@/lib/types";

const Students = () => {
  const columns = React.useMemo<Array<Columns>>(
    () => [
      {
        Header: "Expediente",
        accessor: "expediente",
        inputType: "number",
        icon: <IoSearch />,
      },
      {
        Header: "Nombre",
        accessor: "nombre_completo",
        inputType: "text",
        icon: <IoPerson />,
      },
      {
        Header: "Semestre",
        accessor: "semestre",
        inputType: "number",
        icon: <IoKeypad />,
      },
      {
        Header: "Nacimiento",
        accessor: "fecha_nacimiento",
        inputType: "date",
        icon: <IoCalendar />,
      },
      {
        Header: "Email",
        accessor: "email",
        inputType: "text",
        icon: <IoMail />,
      },
      {
        Header: "Género",
        accessor: "genero",
        inputType: "text",
        icon: <IoSearch />,
      },
      {
        Header: "Teléfono",
        accessor: "telefono",
        inputType: "text",
        icon: <IoCallOutline />,
      },
    ],
    []
  );
  const data = React.useMemo(() => makeStudents(10), []);

  return (
    <div className="component">
      <h1 className="component-title component-element">Estudiantes</h1>
      <Filters columns={columns}/>
      <GenericTable columns={columns} data={data} />
    </div>
  );
};

export default Students;
