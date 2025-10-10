import { useState, useEffect } from "react";
import {
  CustomButton,
  Card,
  Recet,
  RecipeModal,
  DeleteModal,
} from "../../components";
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

export const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const { user, logout, loading: authLoading } = useAuth();

  const getCurrentUser = () => {
    return user?.id;
  };

  useEffect(() => {
    if (!user) return;

    const loadRecipes = () => {
      const savedRecipes = localStorage.getItem("recipes");
      if (savedRecipes) {
        const allRecipes = JSON.parse(savedRecipes);
        const currentUser = getCurrentUser();
        const userRecipes = allRecipes.filter(
          (recipe) => recipe.userId === currentUser
        );
        setRecipes(userRecipes);
      }
    };
    loadRecipes();
  }, [user]);

  const saveRecipesToStorage = (updatedRecipes) => {
    if (!user) return;

    const allRecipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    const currentUser = getCurrentUser();
    const otherUsersRecipes = allRecipes.filter(
      (recipe) => recipe.userId !== currentUser
    );
    const newAllRecipes = [...otherUsersRecipes, ...updatedRecipes];
    localStorage.setItem("recipes", JSON.stringify(newAllRecipes));
  };

  const handleCreateRecipe = (recipeData) => {
    if (!user) return;

    const newRecipe = {
      id: Date.now().toString(),
      ...recipeData,
      userId: getCurrentUser(),
    };

    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    saveRecipesToStorage(updatedRecipes);
    setSelectedRecipe(newRecipe);
  };

  const handleEditSelectedRecipe = () => {
    if (selectedRecipe) {
      setEditingRecipe(selectedRecipe);
      setIsModalOpen(true);
    }
  };

  const handleOpenDeleteModal = () => {
    if (selectedRecipe) {
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedRecipe) {
      const updatedRecipes = recipes.filter(
        (recipe) => recipe.id !== selectedRecipe.id
      );
      setRecipes(updatedRecipes);
      saveRecipesToStorage(updatedRecipes);
      setSelectedRecipe(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleUpdateRecipe = (recipeData) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === editingRecipe.id ? { ...recipe, ...recipeData } : recipe
    );

    setRecipes(updatedRecipes);
    saveRecipesToStorage(updatedRecipes);

    if (selectedRecipe && selectedRecipe.id === editingRecipe.id) {
      setSelectedRecipe({ ...selectedRecipe, ...recipeData });
    }
  };

  const handleOpenCreateModal = () => {
    setEditingRecipe(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRecipe(null);
  };

  const handleSaveRecipe = (recipeData) => {
    if (editingRecipe) {
      handleUpdateRecipe(recipeData);
    } else {
      handleCreateRecipe(recipeData);
    }
  };

  const handleLoginClick = () => {
    logout();
    window.location.href = "/login";
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  if (authLoading) {
    return (
      <div className="loading-container">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="not-authorized">
        <p>No puedes ver la página.</p>
        <button onClick={() => (window.location.href = "/login")}>
          Ir al Login
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="header-user">
          <CustomButton
            customClass="button-logout"
            label="Logout"
            onClick={handleLoginClick}
          />
        </div>

        <div className="container-left">
          <h1 className="title-dashboard">Recetas {recipes.length}</h1>
          <div className="container-recipes">
            {recipes.length === 0 ? (
              <div className="no-recipes">
                <p>No hay recetas</p>
              </div>
            ) : (
              recipes.map((recipe) => (
                <Recet
                  key={recipe.id}
                  title={recipe.title}
                  isSelected={selectedRecipe?.id === recipe.id}
                  onClick={() => handleSelectRecipe(recipe)}
                />
              ))
            )}
          </div>
          <CustomButton
            label="Agregar receta"
            onClick={handleOpenCreateModal}
          />
        </div>

        <div className="container-right">
          <h1 className="title-recipe">
            {selectedRecipe ? selectedRecipe.title : "Receta"}
          </h1>

          {selectedRecipe ? (
            <>
              <Card
                title="Ingredientes"
                content={selectedRecipe.ingredients}
                type="ingredients"
              />

              <Card
                title="Preparación"
                content={selectedRecipe.steps}
                type="steps"
              />

              <Card title="Notas" content={selectedRecipe.notes} type="notes" />
            </>
          ) : (
            <p className="no-selection">
              Selecciona una receta para ver los detalles
            </p>
          )}

          {selectedRecipe && (
            <>
              <CustomButton
                customClass="btn-edit"
                label="Editar"
                onClick={handleEditSelectedRecipe}
              />
              <CustomButton
                customClass="btn-delete"
                label="Eliminar"
                onClick={handleOpenDeleteModal}
              />
            </>
          )}
        </div>
      </div>

      <RecipeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveRecipe}
        recipe={editingRecipe}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        recipeName={selectedRecipe?.title || ""}
      />
    </>
  );
};
