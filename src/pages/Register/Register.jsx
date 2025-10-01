import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CustomInput, FormButton } from "../../components";
import "./Register.css";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid";
    }

    if (!formData.password) {
      newErrors.password = "required";
    } else if (formData.password.length < 6) {
      newErrors.password = "too short";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      setFormData({ name: "", email: "", password: "" });
      setErrors({});
    } catch (error) {
      setErrors({ submit: "[ ERROR ] - Al registrar: " + error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button className="button-login" onClick={handleLoginClick}>
        Sign In
      </button>
      <div className="register-container">
        <h1 className="register-title">Sign Up</h1>
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div>
            <div className="input-container">
              <CustomInput
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span id="name-error" className="error-message" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="input-container">
              <CustomInput
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span id="email-error" className="error-message" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="input-container">
              <CustomInput
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />
              {errors.password && (
                <span
                  id="password-error"
                  className="error-message"
                  role="alert"
                >
                  {errors.password}
                </span>
              )}
            </div>
          </div>

          {errors.submit && (
            <div className="error-message submit-error" role="alert">
              {errors.submit}
            </div>
          )}

          <FormButton
            className="form-button"
            label={isSubmitting ? "Registrando..." : "Register"}
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      </div>
    </>
  );
};
