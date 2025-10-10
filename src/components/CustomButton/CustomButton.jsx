import "./CustomButton.css";

export const CustomButton = ({ type, label, onClick, customClass }) => {
  return (
    <button
      type={type || "button"}
      className={`custom-button ${customClass}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
