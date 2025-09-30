import "./FormButton.css";

export const FormButton = ({ label, handleClick }) => {
  return (
    <button className="form-button" onClick={handleClick}>
      {label}
    </button>
  );
};
