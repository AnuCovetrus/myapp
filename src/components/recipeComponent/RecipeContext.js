import React, { createContext, useState } from 'react';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [category, setCategory] = useState('');

    return (
        <RecipeContext.Provider value={{ category, setCategory }}>
            {children}
        </RecipeContext.Provider>
    );
};