import React from "react";
import { Validation, Product, Student, Visitor } from "@/lib/types";
import Modal from "react-modal";
import "@/css/GenericAddUpdateModal.css";
import "@/css/Filters.css";
import axios from "axios";
import { useAuth } from "@/hooks/authHook";

interface Props {
  attributes: Array<Validation<any>>;
  modalType: boolean;
  modalTitle: string;
  isOpen: boolean;
  openModal: VoidFunction;
  closeModal: VoidFunction;
  elementSelected: Student | Product | Visitor;
  onUpdate: () => void;
  postUrl: string;
}

const customModalStyle = {
  content: {
    backgroundColor: "var(--background0)",
    border: "none",
    borderRadius: 10,
  },
};

Modal.setAppElement("#root");

const GenericAddUpdateModal = (props: Props) => {
  const auth = useAuth();
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

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios({
      method: "post",
      url: props.postUrl,
      data: values,
      headers: {
        Authorization: auth.getAccessToken(),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          props.onUpdate();
        }
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  };

  const fieldsInputs = props.attributes.map((field) => {
    return (
      <div className="select-filter-container" key={field.accessor.toString()}>
        <span className="field-title">{field.header}</span>
        <div>
          <div className="filter">
            {field.icon}
            <input
              value={
                values[field.accessor as keyof typeof props.elementSelected] ||
                ""
              }
              type={field.inputType}
              name={field.accessor.toString()}
              id={field.accessor.toString()}
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
            {props.modalType ? "Actualizar " : "Añadir"} {props.modalTitle}
          </h2>
          {fieldsInputs}
          <div className="submit-button-container">
            <button type="submit" className="generic-button">
              {props.modalType ? "Actualizar " : "Añadir"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default GenericAddUpdateModal;
