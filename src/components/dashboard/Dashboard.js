import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import categoryImage from '../assets/Avocado-Caesar-Green-Beans-finished-400x400.jpg';
import categoryImage1 from '../assets/Veg.webp';
import categoryImage2 from '../assets/Chicken.webp';
import categoryImage3 from '../assets/Keto.jpg';
import categoryImage4 from '../assets/Paleo.jpg';
import useSessionTimeout from "../useSessionTimeout";
import "./Dashboard.css";
import Sidebar from "../sideBar/sideBar";
import RecipeComponent from "../recipeComponent/RecipeContext";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSessionTimeout = () => {
    localStorage.removeItem("user"); // Clear session data if any
    alert("Your session has expired. Please login again.");
    navigate("/");
  };

  // Use a timeout duration of 15 minutes (900000 ms)
  const isTimedOut = useSessionTimeout(1000 * 60 * 15, handleSessionTimeout);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const categories = [
    { name: "Vegetarian", path: "/recipes/Vegetarian", categoryImage:categoryImage },
    { name: "Vegan", path: "/recipes/Vegan", categoryImage:categoryImage1 },
    { name: "Non-Vegetarian", path: "/recipes/Non-Vegetarian", categoryImage:categoryImage2 },
    { name: "Keto", path: "/recipes/Keto", categoryImage:categoryImage3 },
    { name: "Paleo", path: "/recipes/Paleo", categoryImage:categoryImage4 },
  ];

  return (
    <div className="dashboard">
    {isTimedOut && (
      <div className="timeout-message">
        Your session has expired. Please login again.
      </div>
    )}
    {user ? (
      <div>
        <Sidebar user={user} />
        <h2>Recipe Categories</h2>
        <div className="categories">
          {categories.map((category) => (
            <Link key={category.name} to={category.path} Component={category.Component}>
              <div className="category-card">
               <img src={category.categoryImage} alt="Category" />
                <h3>{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    ) : (
      <strong><h2>No user logged in.</h2></strong>
    )}
  </div>
  );
};

export default Dashboard;
