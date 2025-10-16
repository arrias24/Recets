import { useState } from "react";
import { Card } from "../Card/Card";
import "./AccordionView.css";

export const AccordionView = ({ recipe }) => {
  const [isOpen, setIsOpen] = useState({
    ingredients: true,
    steps: true,
    notes: true,
  });

  const toggleAccordion = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="accordion-view">
      <div className="accordion-item">
        <div
          className="accordion-header"
          onClick={() => toggleAccordion("ingredients")}
        >
          <h3 className="accordion-title">Ingredientes</h3>
          <span className="accordion-icon">
            {isOpen.ingredients ? "−" : "+"}
          </span>
        </div>
        {isOpen.ingredients && (
          <Card
            customClass={"card-acordeon"}
            title=""
            content={recipe.ingredients}
            type="ingredients"
            viewMode="compact"
            maxItems={10}
          />
        )}
      </div>

      <div className="accordion-item">
        <div
          className="accordion-header"
          onClick={() => toggleAccordion("steps")}
        >
          <h3 className="accordion-title">Preparación</h3>
          <span className="accordion-icon">{isOpen.steps ? "−" : "+"}</span>
        </div>
        {isOpen.steps && (
          <Card
            customClass={"card-acordeon"}
            title=""
            content={recipe.steps}
            type="steps"
            viewMode="compact"
            maxItems={10}
          />
        )}
      </div>

      <div className="accordion-item">
        <div
          className="accordion-header"
          onClick={() => toggleAccordion("notes")}
        >
          <h3 className="accordion-title">Notas</h3>
          <span className="accordion-icon">{isOpen.notes ? "−" : "+"}</span>
        </div>
        {isOpen.notes && (
          <Card
            title=""
            content={recipe.notes}
            type="notes"
            viewMode="compact"
            customClass={"card-acordeon"}
            maxItems={10}
          />
        )}
      </div>
    </div>
  );
};
