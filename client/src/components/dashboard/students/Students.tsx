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
  const filterUrl = import.meta.env.BASE_URL + "/students"
  const columns = React.useMemo<Array<Columns>>(
    () => [
      {
        Header: "Expediente",
        accessor: "enrollNumber",
        inputType: "number",
        icon: <IoSearch />,
      },
      {
        Header: "Nombre",
        accessor: "fullName",
        inputType: "text",
        icon: <IoPerson />,
      },
      {
        Header: "Semestre",
        accessor: "semester",
        inputType: "number",
        icon: <IoKeypad />,
      },
      {
        Header: "Nacimiento",
        accessor: "birthdate",
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
        accessor: "gender",
        inputType: "text",
        icon: <IoSearch />,
      },
      {
        Header: "Teléfono",
        accessor: "phoneNumber",
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
