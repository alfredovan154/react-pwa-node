import React from "react";
import {
  GenericAttributes,
  GenericFormFields,
  Product,
  Student,
  Visitor,
} from "@/lib/types";
import Modal from "react-modal";
import "@/css/GenericAddUpdateModal.css";

type Props = {
  attributes: Array<GenericAttributes>;
  isUpdateModal: boolean;
  modalTitle: string;
  isOpen: boolean;
  openModal: VoidFunction;
  closeModal: VoidFunction;
  elementSelected: Student | Product | Visitor;
  onUpdate: (element: Student | Product | Visitor) => {};
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
  const [values, setValues] = React.useState<Student | Product | Visitor>(
    props.elementSelected
  );

  React.useEffect(() => {
    setValues(props.elementSelected);
  }, [props.elementSelected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedValues = Object.assign({}, values);
    updatedValues[e.target.name as keyof typeof values] =
      e.target.value.toString();
    setValues(updatedValues);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onUpdate(values);
  };

  const fieldsInputs = props.attributes.map((field) => {
    return (
      <div className="select-filter-container" key={field.accessor}>
        <span className="field-title">{field.Header}</span>
        <div>
          <div className="filter">
            {field.icon}
            <input
              value={
                values[field.accessor as keyof typeof props.elementSelected] ||
                ""
              }
              type={field.inputType}
              name={field.accessor}
              id={field.accessor}
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
        isOpen={props.isOpen}
        style={customModalStyle}
        onRequestClose={props.closeModal}
      >
        <form onSubmit={handleSubmit}>
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
