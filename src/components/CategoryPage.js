import React, { useContext } from 'react';
import { RecipeContext } from './recipeComponent/RecipeContext';

const CategoryPage = () => {
    const { category } = useContext(RecipeContext);

    return (
        <div>
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Recipes</h1>
        </div>
    );
};

export default CategoryPage;