import { CustomButton } from "../";
import "./DeleteModal.css";

export const DeleteModal = ({ isOpen, onClose, onConfirm, recipeName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay delete-modal-overlay" onClick={onClose}>
      <div
        className="delete-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="delete-modal-body">
          <p>
            Eliminar
            <strong> "{recipeName}"</strong>?
          </p>
        </div>

        <div className="delete-modal-actions">
          <CustomButton
            customClass="btn-cancel"
            label="Cancelar"
            onClick={onClose}
          />
          <CustomButton
            customClass="btn-confirm-delete"
            label="Eliminar"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};
