import GenericTable from "../generic/GenericTable";
import Filters from "../generic/GenericFilters";
import {
  IoAdd,
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
import { Filter, GenericAttributes, Student, Test } from "@/lib/types";
import GenericAddUpdateModal from "../generic/GenericAddUpdateModal";
import { useAuth } from "@/hooks/authHook";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import GenericBigButton from "../generic/GenericBigButton";

const Students = () => {
  const auth = useAuth();
  const [students, setStudents] = useState<Array<Student>>([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [studentSelected, setStudentSelected] = useState<Student | null>(null);
  const [filters, setFilters] = useState<Array<Filter>>();

  const url = import.meta.env.VITE_BASE_URL + "/students";
  const studentAttributes = useMemo<Array<GenericAttributes>>(
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

  const columns = useMemo(
    () => studentAttributes.filter((detail) => detail.isVisibleOnTable),
    []
  );

  // Get the students
  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: url,
        headers: {
          Authorization: auth.getAccessToken(),
        },
        data: {
          filters: filters
        }
      }).then((response) => {
        setStudents(response.data as Array<Student>);
      });
    };
    if (isLoading) {
      fetchData();
    }
    setIsLoading(false);
  }, [isLoading]);

  const handleUpdate = () => {
    closeModal();
    setIsLoading(true);
  }

  const handleChangeFilters = (filters: Array<Filter>) => {
    setFilters(filters);
    setIsLoading(true);
  }

  // Code for the modal
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setStudentSelected(null);
    setIsOpen(false);
  };

  const handleSelect = (student: Student) => {
    setStudentSelected(student);
    setIsOpen(true);
  };

  //const data = React.useMemo(() => makeStudents(10), []);
  const handleBigButton = () => {
    setIsOpen(true);
  };

  return (
    <div className="component">
      <h1 className="component-title component-element">Estudiantes</h1>
      <Filters columns={studentAttributes} onChangeFilters={handleChangeFilters}/>
      {students ? (
        <GenericTable
          columns={columns}
          data={students}
          onSelect={handleSelect}
        />
      ) : null}
      <GenericAddUpdateModal
        isUpdateModal={studentSelected ? true : false}
        attributes={studentAttributes}
        elementSelected={studentSelected || ({} as Student)}
        modalTitle="estudiante"
        onUpdate={handleUpdate}
        postUrl={url}
        closeModal={closeModal}
        openModal={openModal}
        isOpen={modalIsOpen}
      />
      <GenericBigButton icon={<IoAdd />} callback={handleBigButton} />
    </div>
  );
};

export default Students;
