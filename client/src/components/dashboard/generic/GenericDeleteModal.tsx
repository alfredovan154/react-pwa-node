import Modal from "react-modal";
import "@/css/DeleteModal.css";
import { Product, Visitor } from "@/lib/types";
import axios from "axios";
import { useAuth } from "@/hooks/authHook";

const customModalStyle = {
  content: {
    backgroundColor: "var(--background0)",
    border: "none",
    borderRadius: 10,
    outerHeight: 20,
  },
};

Modal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  closeModal: VoidFunction;
  openModal: VoidFunction;
  url: string;
  modalTitle: string;
  elementSelected: Visitor | Product;
  onDeletion: VoidFunction;
}

const GenericDeleteModal = (props: Props) => {
  const auth = useAuth();

  const handleDelete = async () => {
    await axios({
      method: "delete",
      url: props.url,
      params: { id: props.elementSelected.id },
      headers: {
        Authorization: auth.getAccessToken(),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          props.onDeletion();
        }
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  };

  return (
    <Modal
      isOpen={props.isOpen}
      style={customModalStyle}
      onRequestClose={props.closeModal}
      className={"delete-modal"}
    >
      <h2>Borrar {props.modalTitle}</h2>
      <div className="delete-buttons-container">
        <button className="delete-button" onClick={props.closeModal}>
          Cancelar
        </button>
        <button
          className="delete-button"
          style={{ backgroundColor: "var(--blue0)" }}
          onClick={handleDelete}
        >
          Aceptar
        </button>
      </div>
    </Modal>
  );
};

export default GenericDeleteModal;
