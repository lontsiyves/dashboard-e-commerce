import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmationNotification = ({ message, onConfirm, onCancel }) => {
  const handleConfirm = () => {
    onConfirm();
    toast.dismiss();
  };

  const handleCancel = () => {
    onCancel();
    toast.dismiss();
  };

  return (
    <div>
      <p>{message}</p>
      <button className="btn btn-danger btn-sm mr-1" onClick={handleConfirm}>Confirmer</button>
      <button className="btn btn-info btn-sm" onClick={handleCancel}>Annuler</button>
    </div>
  );
};

export default ConfirmationNotification;
