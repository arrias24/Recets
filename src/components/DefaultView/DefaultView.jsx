import { Card } from "../Card/Card";
import "./DefaultView.css";

export const DefaultView = ({ recipe }) => {
  return (
    <>
      <Card
        title="Ingredientes"
        content={recipe.ingredients}
        type="ingredients"
        viewMode="default"
      />
      <Card
        title="Preparación"
        content={recipe.steps}
        type="steps"
        viewMode="default"
      />
      <Card
        title="Notas"
        content={recipe.notes}
        type="notes"
        viewMode="default"
      />
    </>
  );
};
