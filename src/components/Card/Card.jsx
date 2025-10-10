// components/Card/Card.js
import { useState } from "react";
import "./Card.css";

export const Card = ({
  title,
  content,
  type = "text",
  onClick,
  maxItems = 3,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getContentLines = () => {
    if (!content) return [];
    return content.split("\n").filter((line) => line.trim() !== "");
  };

  const lines = getContentLines();
  const hasMoreItems = lines.length > maxItems;
  const visibleLines = isExpanded ? lines : lines.slice(0, maxItems);

  const formatContent = (linesToFormat, contentType) => {
    if (linesToFormat.length === 0) {
      return <div className="empty-state">Sin contenido</div>;
    }

    if (contentType === "ingredients") {
      return formatIngredients(linesToFormat);
    } else if (contentType === "steps") {
      return formatSteps(linesToFormat);
    } else {
      return formatText(linesToFormat);
    }
  };

  const formatIngredients = (lines) => {
    return (
      <div className="">
        {lines.map((line, index) => (
          <div key={index} className="ingredient-item-card">
            <span className="bullet">•</span>
            <span className="ingredient-text">{line.trim()}</span>
          </div>
        ))}
      </div>
    );
  };

  const formatSteps = (lines) => {
    return (
      <div className="steps-list">
        {lines.map((line, index) => {
          const trimmedLine = line.trim();
          if (/^\d+\./.test(trimmedLine)) {
            const [number, ...textParts] = trimmedLine.split(".");
            const text = textParts.join(".").trim();
            return (
              <div key={index} className="step-item">
                <span className="step-number">{number}.</span>
                <span className="step-text">{text}</span>
              </div>
            );
          } else {
            return (
              <div key={index} className="step-item">
                <span className="step-number">{index + 1}.</span>
                <span className="step-text">{trimmedLine}</span>
              </div>
            );
          }
        })}
      </div>
    );
  };

  const formatText = (lines) => {
    return lines.map((line, index) => (
      <div key={index} className="text-line">
        {line.trim()}
      </div>
    ));
  };

  const handleCardClick = () => {
    if (hasMoreItems) {
      setIsExpanded(!isExpanded);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`card card-${type} ${isExpanded ? "card-expanded" : ""}`}
      onClick={handleCardClick}
    >
      <h2 className="card-title">{title}</h2>

      <div className="card-content">
        {formatContent(visibleLines, type)}

        {hasMoreItems && !isExpanded && (
          <div className="more-items-overlay">
            <div className="more-items-text">↓</div>
          </div>
        )}
      </div>
    </div>
  );
};
