import { useAuth } from "@/hooks/authHook";
import { Filter, Visitor } from "@/lib/types";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import GenericTable from "@/components/dashboard/generic/GenericTable";
import GenericAddUpdateModal from "../generic/GenericAddUpdateModal";
import axios from "axios";

const Visitors = () => {
  const auth = useAuth();
  const [visitors, setVisitors] = React.useState<Array<Visitor>>([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [studentSelected, setStudentSelected] = React.useState<Visitor | null>(
    null
  );
  const [filters, setFilters] = React.useState<Visitor>();
  const url = import.meta.env.VITE_BASE_URL + "/visitor";
  const columnHelper = createColumnHelper<Visitor>();

  const columns = [
    {id},
    columnHelper.accessor("recordId", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("fullName", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("birthdate", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("age", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("birthState", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
  ];

  React.useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: url,
        headers: {
          Authorization: auth.getAccessToken(),
        },
        data: {
          filters: filters,
        },
      }).then((response) => {
        setVisitors(response.data as Array<Visitor>);
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
  };

  const handleChangeFilters = (filters: Visitor) => {
    setFilters(filters);
    setIsLoading(true);
  };

  // Code for the modal
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setStudentSelected(null);
    setIsOpen(false);
  };

  const handleSelect = (visitor: Visitor) => {
    setStudentSelected(visitor);
    setIsOpen(true);
  };

  const handleBigButton = () => {
    setIsOpen(true);
  };

  return (
    <div className="component">
      <h1 className="component-title component-element">Estudiantes</h1>
      <Filters
        columns={studentAttributes}
        onChangeFilters={handleChangeFilters}
      />
      {visitors ? (
        <GenericTable
          columns={columns}
          data={visitors}
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

export default Visitors;
