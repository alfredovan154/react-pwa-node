import React from "react";
import GenericFilters from "./GenericFilters";
import GenericTable from "./GenericTable";
import GenericAddUpdateModal from "./GenericAddUpdateModal";
import GenericDeleteModal from "./GenericDeleteModal";
import GenericBigButton from "./GenericBigButton";
import { useAuth } from "@/hooks/authHook";
import axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";
import { Product, Validation, Visitor } from "@/lib/types";
import RowActions from "./RowActions";
import { IoAdd } from "react-icons/io5";

type Props = {
  data: Array<any>;
  url: string;
  validations: Array<Validation<any>>;
  modalTitle: string;
  filters: Partial<any>;
  onLoading: (loading: boolean) => void;
  onFilters: (filters: Partial<any>) => void;
};

const GenericPage = (props: Props) => {
  const auth = useAuth();
  const [modalAddUpdateIsOpen, setModalAddUpdateModalIsOpen] = React.useState(false);
  const [modalDeleteIsOpen, setDeleteModalIsOpen] = React.useState(false);
  const [visitorSelected, setVisitorSelected] = React.useState<
    Visitor | Product | null
  >(null);
  const columnHelper = createColumnHelper<any>();

  const columns2 = props.validations
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
      } else {
        return columnHelper.accessor(
          validation.accessor,
          {
            cell: (info) => info.getValue(),
            header: validation.header,
          }
        );
      }
    });

  const dowloadExcel = async () => {
    await axios({
      method: "get",
      url: props.url + "/excel",
      responseType: "blob",
      headers: {
        Authorization: auth.getAccessToken(),
      },
    }).then((response) => {
      const href = URL.createObjectURL(response.data);
      const date = new Date();
      const filename =
        props.modalTitle + date.toLocaleDateString("en-GB") + ".xlsx";

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
    props.onLoading(true);
  };

  const handleDeletion = () => {
    closeDeleteModal();
    props.onLoading(true);
  };

  const handleChangeFilters = (filters: Partial<Visitor | Product>) => {
    props.onFilters(filters);
    props.onLoading(true);
  };

  // Code for the modal
  const openModalUpdateAddModal = () => {
    setModalAddUpdateModalIsOpen(true);
  };

  const closeModalUpdateAddModal = () => {
    setVisitorSelected(null);
    setModalAddUpdateModalIsOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setVisitorSelected(null);
    setDeleteModalIsOpen(false);
  };

  const handleSelect = (id: number) => {
    const visitor = props.data.filter((visitor) => visitor.id === id);
    setVisitorSelected(visitor[0]);
    setModalAddUpdateModalIsOpen(true);
  };

  const handleDelete = (id: number) => {
    const visitor = props.data.filter((visitor) => visitor.id === id);
    setVisitorSelected(visitor[0]);
    setDeleteModalIsOpen(true);
  };

  const handleBigButton = () => {
    setModalAddUpdateModalIsOpen(true);
  };
  return (
    <div className="component">
      <h1 className="component-title component-element">{props.modalTitle}</h1>
      <GenericFilters
        filters={props.filters}
        onChangeFilters={handleChangeFilters}
        attributes={props.validations.filter(
          (validation) => validation.isOnForm
        )}
      />
      {props.data ? (
        <GenericTable
          columns={columns2}
          data={props.data}
          onDownloadExcel={dowloadExcel}
        />
      ) : null}
      <GenericAddUpdateModal
        modalType={visitorSelected ? true : false}
        attributes={props.validations.filter(
          (validation) => validation.isOnForm
        )}
        elementSelected={visitorSelected || ({} as Visitor)}
        modalTitle={props.modalTitle}
        onUpdate={handleUpdate}
        postUrl={props.url}
        closeModal={closeModalUpdateAddModal}
        openModal={openModalUpdateAddModal}
        isOpen={modalAddUpdateIsOpen}
      />
      <GenericDeleteModal
        closeModal={closeDeleteModal}
        openModal={openDeleteModal}
        elementSelected={visitorSelected || ({} as Visitor)}
        isOpen={modalDeleteIsOpen}
        url={props.url}
        modalTitle={props.modalTitle}
        onDeletion={handleDeletion}
      />
      <GenericBigButton icon={<IoAdd />} callback={handleBigButton} />
    </div>
  );
};

export default GenericPage;
