import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from './RecipeContext';

const CategoryLink = ({ category }) => {
    const { setCategory } = useContext(RecipeContext);

    return (
        <Link
            to={`/category/${category}`}
            onClick={() => setCategory(category)}
        >
            {category}
        </Link>
    );
};

export default CategoryLink;