import "./Recet.css";

export const Recet = ({ title, onClick, isSelected }) => {
  return (
    <div
      className={`recet ${isSelected ? "recet--selected" : ""}`}
      onClick={onClick}
    >
      <h2 className="title-recet">{title}</h2>
    </div>
  );
};
