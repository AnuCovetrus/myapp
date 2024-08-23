import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Vegan.css"; // Import your CSS file for styling

const VegetarianComponent = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const APP_ID = "a52b4d43";
  const APP_KEY = "e0e5c667605f5e91d8275c97353b80a";
  useEffect(() => {
    const fetchRecipes = async (searchString) => {
      try {
        const response = await axios.get(
          `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
        ); // Replace with your API endpoint

        setRecipes(response.data);
      } catch (err) {
        setError("Failed to fetch recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="vegan-recipes">
      <h1>Vegan Recipes</h1>
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
              <img src={recipe.image} alt={recipe.name} />
            </div>
          ))
        ) : (
          <p>No vegan recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default VegetarianComponent;
