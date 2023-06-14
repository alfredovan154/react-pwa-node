import "@/css/Table.css";
import {
  IoPencil,
  IoPencilOutline,
  IoTrash,
  IoTrashOutline,
} from "react-icons/io5";

const RowActions = ({
  id,
  onEdition,
  onDelete
}: {
  id: number;
  onEdition: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="actions-container">
      <button onClick={() => onEdition(id)} className="action-button">
        <IoPencilOutline />
      </button>
      <button onClick={() => onDelete(id)} className="action-button">
        <IoTrashOutline />
      </button>
    </div>
  );
};

export default RowActions;
