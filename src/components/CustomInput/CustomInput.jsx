import "./CustomInput.css";

export const CustomInput = ({
  type,
  value,
  onChange,
  onBlur,
  customClass,
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`custom-input ${customClass}`}
      {...props}
    />
  );
};
