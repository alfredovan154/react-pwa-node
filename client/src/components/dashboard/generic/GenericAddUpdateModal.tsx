import React from "react";
import { GenericAttributes, GenericFormFields } from "@/lib/types";
import Modal from "react-modal";
import "@/css/GenericAddUpdateModal.css";

type Props = {
  attributes: Array<GenericAttributes>;
  isUpdateModal: boolean;
  modalTitle: string;
};

const customModalStyle = {
  content: {
    backgroundColor: "var(--background0)",
    border: "none",
    borderRadius: 10,
  },
};

Modal.setAppElement("#root");

const GenericAddUpdateModal = (props: Props) => {
  const [fields, setFields] = React.useState<Array<GenericFormFields>>(
    props.attributes.map((attribute) => ({
      name: attribute.Header,
      value: null,
      inputType: attribute.inputType,
      icon: attribute.icon,
    }))
  );
  const [modalIsOpen, setIsOpen] = React.useState(true);

  const handleChange = () => {};

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const fieldsInputs = fields.map((field) => {
    return (
      <div className="select-filter-container" key={field.name}>
        <span className="field-title">{field.name}</span>
        <div>
          <div className="filter">
            {field.icon}
            <input
              type={field.inputType}
              name={field.name}
              min={1}
              id={field.name}
              onChange={handleChange}
              className="filter-input"
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={customModalStyle}
        onRequestClose={closeModal}
      >
        <form action="">
          <h2>
            {props.isUpdateModal ? "Actualizar " : "Añadir"} {props.modalTitle}
          </h2>
          {fieldsInputs}
          <div className="submit-button-container">
            <button type="submit" className="generic-button">
              {props.isUpdateModal ? "Actualizar " : "Añadir"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default GenericAddUpdateModal;
