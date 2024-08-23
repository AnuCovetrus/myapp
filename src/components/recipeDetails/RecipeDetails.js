import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';
import CategoryLink from "../recipeComponent/CategoryLink";
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
 
  const recipe = {
      id: '1',
      name: 'Spaghetti Carbonara',
      category: 'non-veg',
      description: 'A classic Italian pasta dish.',
  };

  return (
      <div>
          {/* <h1>{recipe.name}</h1>
          <p>{recipe.description}</p>
          <Link to={`/category/${recipe.category}`}>See more {recipe.category} Recipes</Link>
           */}
          <nav>
            <CategoryLink category="Vegan" />
            <CategoryLink category="Vegetarian" />
            <CategoryLink category="Non-Veg" />
            <CategoryLink category="Keto" />
            <CategoryLink category="Paleo" />
          </nav>
      </div>
  );
};

export default RecipeDetails;