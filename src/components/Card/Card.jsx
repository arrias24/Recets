import { useState } from "react";
import "./Card.css";

export const Card = ({
  customClass,
  title,
  content,
  type = "text",
  onClick,
  maxItems = 3,
  viewMode = "default",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getContentLines = () => {
    if (!content) return [];
    return content.split("\n").filter((line) => line.trim() !== "");
  };

  const lines = getContentLines();
  const hasMoreItems = lines.length > maxItems;
  const visibleLines = isExpanded ? lines : lines.slice(0, maxItems);

  const formatContent = (linesToFormat, contentType, currentViewMode) => {
    if (linesToFormat.length === 0) {
      return (
        <div className={`empty-state ${customClass}-empty-state`}>
          Sin contenido
        </div>
      );
    }

    if (currentViewMode === "compact") {
      return formatCompact(linesToFormat, contentType);
    } else if (currentViewMode === "minimal") {
      return formatMinimal(linesToFormat, contentType);
    }

    if (contentType === "ingredients") {
      return formatIngredients(linesToFormat);
    } else if (contentType === "steps") {
      return formatSteps(linesToFormat);
    } else {
      return formatText(linesToFormat);
    }
  };

  const formatCompact = (lines, contentType) => {
    return (
      <div className={`compact-content ${customClass}-compact-content`}>
        {lines.map((line, index) => (
          <div
            key={index}
            className={`compact-item ${customClass}-compact-item`}
          >
            {contentType === "ingredients" && (
              <span className={`compact-bullet ${customClass}-compact-bullet`}>
                •
              </span>
            )}
            {contentType === "steps" && (
              <span className={`compact-number ${customClass}-compact-number`}>
                {index + 1}.
              </span>
            )}
            <span className={`compact-text ${customClass}-compact-text`}>
              {line.trim()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const formatMinimal = (lines) => {
    const truncatedContent = lines.join(", ").substring(0, 100);
    return (
      <div className={`minimal-content ${customClass}-minimal-content`}>
        <p className={`minimal-text ${customClass}-minimal-text`}>
          {truncatedContent}
          {lines.join(", ").length > 100 ? "..." : ""}
        </p>
      </div>
    );
  };

  const formatIngredients = (lines) => {
    return (
      <div className={`${customClass}-ingredients-container`}>
        {lines.map((line, index) => (
          <div
            key={index}
            className={`ingredient-item-card ${customClass}-ingredient-item`}
          >
            <span className={`bullet ${customClass}-bullet`}>•</span>
            <span className={`ingredient-text ${customClass}-ingredient-text`}>
              {line.trim()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const formatSteps = (lines) => {
    return (
      <div className={`steps-list ${customClass}-steps-list`}>
        {lines.map((line, index) => {
          const trimmedLine = line.trim();
          if (/^\d+\./.test(trimmedLine)) {
            const [number, ...textParts] = trimmedLine.split(".");
            const text = textParts.join(".").trim();
            return (
              <div key={index} className={`step-item ${customClass}-step-item`}>
                <span className={`step-number ${customClass}-step-number`}>
                  {number}.
                </span>
                <span className={`step-text ${customClass}-step-text`}>
                  {text}
                </span>
              </div>
            );
          } else {
            return (
              <div key={index} className={`step-item ${customClass}-step-item`}>
                <span className={`step-number ${customClass}-step-number`}>
                  {index + 1}.
                </span>
                <span className={`step-text ${customClass}-step-text`}>
                  {trimmedLine}
                </span>
              </div>
            );
          }
        })}
      </div>
    );
  };

  const formatText = (lines) => {
    return lines.map((line, index) => (
      <div key={index} className={`text-line ${customClass}-text-line`}>
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
      className={`card card-${type} card-${viewMode} ${
        isExpanded ? "card-expanded" : ""
      } ${customClass} ${customClass}-${type} ${customClass}-${viewMode} ${
        isExpanded ? `${customClass}-expanded` : ""
      }`}
      onClick={handleCardClick}
    >
      <h2 className={`card-title ${customClass}-title`}>{title}</h2>

      <div className={`card-content ${customClass}-content`}>
        {formatContent(visibleLines, type, viewMode)}

        {hasMoreItems && !isExpanded && viewMode === "default" && (
          <div className={`more-items-overlay ${customClass}-more-overlay`}>
            <div className={`more-items-text ${customClass}-more-text`}>↓</div>
          </div>
        )}
      </div>
    </div>
  );
};
