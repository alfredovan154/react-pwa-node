import React from "react";
import GenericTable from "../generic/GenericTable";
import Filters from "../generic/GenericFilters";
import { makeStudents } from "@/lib/makeData";
import {
  IoCalendar,
  IoCallOutline,
  IoIdCardOutline,
  IoKeypad,
  IoMail,
  IoMapOutline,
  IoPerson,
  IoSearch,
} from "react-icons/io5";
import "@/css/Component.css";
import { GenericAttributes, GenericField } from "@/lib/types";
import GenericAddUpdateModal from "../generic/GenericAddUpdateModal";

const Students = () => {
  const filterUrl = import.meta.env.BASE_URL + "/students";
  const studentAttributes = React.useMemo<Array<GenericAttributes>>(
    () => [
      {
        Header: "Expediente",
        accessor: "enrollNumber",
        inputType: "number",
        icon: <IoSearch />,
        required: true,
        isVisibleOnTable: true,
      },
      {
        Header: "Nombre",
        accessor: "fullName",
        inputType: "text",
        icon: <IoIdCardOutline />,
        required: true,
        isVisibleOnTable: true,
      },
      {
        Header: "Semestre",
        accessor: "semester",
        inputType: "number",
        icon: <IoKeypad />,
        required: true,
        isVisibleOnTable: true,
      },
      {
        Header: "Nacimiento",
        accessor: "birthdate",
        inputType: "date",
        icon: <IoCalendar />,
        required: true,
        isVisibleOnTable: true,
      },
      {
        Header: "Email",
        accessor: "email",
        inputType: "text",
        icon: <IoMail />,
        required: true,
        isVisibleOnTable: true,
      },
      {
        Header: "Género",
        accessor: "gender",
        inputType: "text",
        icon: <IoPerson />,
        required: true,
        isVisibleOnTable: true,
      },
      {
        Header: "Teléfono",
        accessor: "phoneNumber",
        inputType: "text",
        icon: <IoCallOutline />,
        required: true,
        isVisibleOnTable: true,
      },
      {
        Header: "Dirección",
        accessor: "address",
        inputType: "text",
        icon: <IoMapOutline />,
        required: true,
        isVisibleOnTable: false,
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => studentAttributes.filter((detail) => detail.isVisibleOnTable),
    []
  );

  const data = React.useMemo(() => makeStudents(10), []);

  return (
    <div className="component">
      <h1 className="component-title component-element">Estudiantes</h1>
      <Filters columns={studentAttributes} />
      <GenericTable columns={columns} data={data} />
      <GenericAddUpdateModal
        isUpdateModal={false}
        attributes={studentAttributes}
        modalTitle="estudiante"
      />
    </div>
  );
};

export default Students;
