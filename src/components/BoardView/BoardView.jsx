import { useState } from "react";
import { Card } from "../Card/Card";
import { CustomButton } from "../CustomButton/CustomButton";
import "./BoardView.css";

export const BoardView = ({ recipe }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sections = [
    {
      title: "Ingredientes",
      content: recipe.ingredients,
      type: "ingredients",
    },
    {
      title: "Preparación",
      content: recipe.steps,
      type: "steps",
    },
    {
      title: "Notas",
      content: recipe.notes,
      type: "notes",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sections.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="carousel-view">
      <div className="carousel-controls">
        <CustomButton
          customClass="carousel-btn carousel-btn--prev"
          onClick={prevSlide}
          label={"<"}
        />

        <div className="carousel-main">
          <div
            className="carousel-cards-container"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {sections.map((section, index) => (
              <div key={index} className="carousel-card-wrapper">
                <Card
                  title={section.title}
                  content={section.content}
                  type={section.type}
                  viewMode="default"
                  customClass="carousel-card"
                />
              </div>
            ))}
          </div>
        </div>

        <CustomButton
          customClass="carousel-btn carousel-btn--next"
          onClick={nextSlide}
          label={">"}
        />
      </div>

      <div className="carousel-indicators">
        {sections.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${
              index === currentSlide ? "carousel-indicator--active" : ""
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
