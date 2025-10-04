import "./Dashboard.css";

export const Dashboard = () => {
  const handleLoginClick = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="container">
        <button className="button-logout" onClick={handleLoginClick}>
          Logout
        </button>
        <div className="container-left">
          <h1 className="title-dashboard">Recetas</h1>
          <div className="container-recipes">
            <p>Este es una receta de ejemplo.</p>
            <p>Este es una receta de ejemplo.</p>
            <p>Este es una receta de ejemplo.</p>
            <p>Este es una receta de ejemplo.</p>
            <p>Este es una receta de ejemplo.</p>
            <p>Este es una receta de ejemplo.</p>
            <p>Este es una receta de ejemplo.</p>
            <p>Este es una receta de ejemplo.</p>
            <p>Este es una receta de ejemplo.</p>
            <p>Este es una receta de ejemplo.</p>
            <p>Este es una receta de ejemplo.</p>
          </div>
          <button className="btn-add-recipe">Agregar receta</button>
        </div>
        <div className="container-right">
          <h1 className="title-recipe">Receta</h1>
          <div className="container-ingredients">
            <h2 className="title-info-recipe">Ingredientes</h2>
            <p>ingrediente de prueba</p>
            <p>ingrediente de prueba</p>
            <p>ingrediente de prueba</p>
            <p>ingrediente de prueba</p>
            <p>ingrediente de prueba</p>
            <p>ingrediente de prueba</p>
          </div>
          <div className="container-steps">
            <h2 className="title-info-recipe">Pasos</h2>
            <p>paso de prueba</p>
            <p>paso de prueba</p>
            <p>paso de prueba</p>
            <p>paso de prueba</p>
            <p>paso de prueba</p>
            <p>paso de prueba</p>
          </div>
          <div className="container-notes">
            <h2 className="title-info-recipe">Notas</h2>
            <p>nota de prueba</p>
            <p>nota de prueba</p>
            <p>nota de prueba</p>
            <p>nota de prueba</p>
          </div>
        </div>
      </div>
    </>
  );
};
