import { useState } from "react";
import { Card } from "../Card/Card";
import { CustomButton } from "../CustomButton/CustomButton";
import "./TabsView.css";

export const TabsView = ({ recipe }) => {
  const [activeTab, setActiveTab] = useState("ingredients");

  return (
    <div className="tabs-view">
      <div className="tabs-header">
        <CustomButton
          className={`tab-btn ${
            activeTab === "ingredients" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("ingredients")}
          label="Ingredientes"
        />
        <CustomButton
          className={`tab-btn ${activeTab === "steps" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("steps")}
          label="Preparación"
        />
        <CustomButton
          className={`tab-btn ${activeTab === "notes" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("notes")}
          label="Notas"
        />
      </div>
      <div className="tab-content">
        {activeTab === "ingredients" && (
          <Card
            customClass={"card-tab"}
            title="Ingredientes"
            content={recipe.ingredients}
            type="ingredients"
          />
        )}
        {activeTab === "steps" && (
          <Card
            customClass={"card-tab"}
            title="Preparación"
            content={recipe.steps}
            type="steps"
          />
        )}
        {activeTab === "notes" && (
          <Card
            customClass={"card-tab"}
            title="Notas"
            content={recipe.notes}
            type="notes"
          />
        )}
      </div>
    </div>
  );
};
