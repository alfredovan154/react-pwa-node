import React from "react";
import GenericFilters from "./GenericFilters";
import GenericTable from "./GenericTable";
import GenericAddUpdateModal from "./GenericAddUpdateModal";
import GenericDeleteModal from "./GenericDeleteModal";
import GenericBigButton from "./GenericBigButton";
import { useAuth } from "@/hooks/authHook";
import axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";
import { Product, Visitor } from "@/lib/types";

type Props = {
    data: Array<Visitor | Product>;
    url: string;
}

const GenericPage = () => {
  const auth = useAuth();
  const [visitors, setVisitors] = React.useState<Array<Visitor>>([]);
  const [modalAddUpdateIsOpen, setModalAddUpdateModal] = React.useState(false);
  const [modalDeleteIsOpen, setDeleteModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [visitorSelected, setVisitorSelected] = React.useState<Visitor | null>(
    null
  );
  const [filters, setFilters] = React.useState<Partial<Visitor>>({});
  const url = import.meta.env.VITE_BASE_URL + "/visitor";
  const columnHelper = createColumnHelper<Visitor>();

  const columns2 = validations
    .filter((validation) => validation.isVisibleOnTable)
    .map((validation) => {
      if (validation.accessor === "id") {
        return columnHelper.accessor("id", {
          cell: (info) => (
            <RowActions
              id={info.getValue()}
              onEdition={handleSelect}
              onDelete={handleDelete}
            />
          ),
          header: "Acciones",
        });
      }
      return columnHelper.accessor(validation.accessor, {
        cell: (info) => info.getValue(),
        header: validation.header,
      });
    });

  React.useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: url,
        headers: {
          Authorization: auth.getAccessToken(),
        },
        params: filters,
      }).then((response) => {
        setVisitors(response.data as Array<Visitor>);
      });
    };
    if (isLoading) {
      fetchData();
    }
    setIsLoading(false);
  }, [isLoading]);

  const dowloadExcel = async () => {
    await axios({
      method: "get",
      url: url + "/excel",
      responseType: "blob",
      headers: {
        Authorization: auth.getAccessToken(),
      },
    }).then((response) => {
      const href = URL.createObjectURL(response.data);
      const date = new Date();
      const filename =
        "visitantes-" + date.toLocaleDateString("en-GB") + ".xlsx";

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", filename); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const handleUpdate = () => {
    closeModalUpdateAddModal();
    setIsLoading(true);
  };

  const handleDeletion = () => {
    closeDeleteModal();
    setIsLoading(true);
  };

  const handleChangeFilters = (filters: Visitor) => {
    setFilters(filters);
    setIsLoading(true);
  };

  // Code for the modal
  const openModalUpdateAddModal = () => {
    setModalAddUpdateModal(true);
  };

  const closeModalUpdateAddModal = () => {
    setVisitorSelected(null);
    setModalAddUpdateModal(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setVisitorSelected(null);
    setDeleteModal(false);
  };

  const handleSelect = (id: number) => {
    const visitor = visitors.filter((visitor) => visitor.id === id);
    setVisitorSelected(visitor[0]);
    setModalAddUpdateModal(true);
  };

  const handleDelete = (id: number) => {
    const visitor = visitors.filter((visitor) => visitor.id === id);
    setVisitorSelected(visitor[0]);
    setDeleteModal(true);
  };

  const handleBigButton = () => {
    setModalAddUpdateModal(true);
  };
  return (
    <div className="component">
      <h1 className="component-title component-element">Visitantes</h1>
      <GenericFilters
        filters={filters}
        onChangeFilters={handleChangeFilters}
        attributes={validations.filter((validation) => validation.isOnForm)}
      />
      {visitors ? (
        <GenericTable
          columns={columns2}
          data={visitors}
          onDownloadExcel={dowloadExcel}
        />
      ) : null}
      <GenericAddUpdateModal
        modalType={visitorSelected ? true : false}
        attributes={validations.filter((validation) => validation.isOnForm)}
        elementSelected={visitorSelected || ({} as Visitor)}
        modalTitle="visitante"
        onUpdate={handleUpdate}
        postUrl={url}
        closeModal={closeModalUpdateAddModal}
        openModal={openModalUpdateAddModal}
        isOpen={modalAddUpdateIsOpen}
      />
      <GenericDeleteModal
        closeModal={closeDeleteModal}
        openModal={openDeleteModal}
        elementSelected={visitorSelected || ({} as Visitor)}
        isOpen={modalDeleteIsOpen}
        url={url}
        modalTitle={"visitante"}
        onDeletion={handleDeletion}
      />
      <GenericBigButton icon={<IoAdd />} callback={handleBigButton} />
    </div>
  );
};

export default GenericPage;
