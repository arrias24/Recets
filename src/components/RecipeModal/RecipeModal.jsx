import { useState, useEffect } from "react";
import { CustomButton, CustomInput } from "../index";
import "./RecipeModal.css";

export const RecipeModal = ({ isOpen, onClose, onSave, recipe }) => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [],
    steps: "",
    notes: "",
  });

  const [newIngredient, setNewIngredient] = useState("");

  useEffect(() => {
    if (recipe) {
      const ingredientsArray =
        typeof recipe.ingredients === "string"
          ? recipe.ingredients.split("\n").filter((item) => item.trim())
          : recipe.ingredients || [];

      setFormData({
        title: recipe.title || "",
        ingredients: ingredientsArray,
        steps: recipe.steps || "",
        notes: recipe.notes || "",
      });
    } else {
      setFormData({
        title: "",
        ingredients: [],
        steps: "",
        notes: "",
      });
    }
    setNewIngredient("");
  }, [recipe, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addIngredient = () => {
    const trimmedIngredient = newIngredient.trim();
    if (
      trimmedIngredient &&
      !formData.ingredients.includes(trimmedIngredient)
    ) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, trimmedIngredient],
      }));
      setNewIngredient("");
    }
  };

  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("El título es requerido");
      return;
    }

    const saveData = {
      ...formData,
      ingredients: formData.ingredients.join("\n"),
    };

    onSave(saveData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label-title">Título</label>
            <CustomInput
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              customClass={"input"}
            />
          </div>

          <div className="form-group">
            <label className="label-title">Ingredientes</label>
            <div className="ingredients-input-container">
              <div className="ingredient-input-row">
                <CustomInput
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ingrediente"
                  customClass={"input"}
                />
                <CustomButton
                  customClass="btn-add"
                  label=" ←"
                  onClick={addIngredient}
                />
              </div>
              <div className="ingredients-list">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <span>{ingredient}</span>
                    <CustomButton
                      customClass="remove-btn"
                      label="×"
                      onClick={() => removeIngredient(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group description-group">
            <div className="description-column">
              <label className="label-title">Pasos</label>
              <textarea
                value={formData.steps}
                onChange={(e) => handleChange("steps", e.target.value)}
                className="steps-textarea"
              />
            </div>
            <div className="description-column">
              <label className="label-title">Notas</label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                className="notes-textarea"
              />
            </div>
          </div>

          <div className="modal-actions">
            <CustomButton
              customClass="btn-cancel"
              label="Cancelar"
              onClick={onClose}
            />
            <CustomButton
              type="submit"
              customClass="btn-save"
              label={recipe ? "Actualizar" : "Crear"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
