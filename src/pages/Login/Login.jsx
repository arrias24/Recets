import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CustomInput, FormButton } from "../../components";
import { useAuth } from "../../context";
import "./Login.css";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
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

    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid";
    }

    if (!formData.password) {
      newErrors.password = "Required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Too short";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);

      const result = await login(formData.email, formData.password);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: "[ ERROR ] - Al registrar: " + error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button className="button-login" onClick={handleRegisterClick}>
        Sign Up
      </button>
      <div className="register-container">
        <h1 className="register-title">Sign In</h1>
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div>
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
            <div className="submit-error" role="alert">
              {errors.submit}
            </div>
          )}

          <FormButton
            className="form-button"
            label={isSubmitting ? "Loading..." : "Login"}
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      </div>
    </>
  );
};
