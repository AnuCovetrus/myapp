import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoute from "./../src/components/PrivateRoute";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LoginPage from "./components/login/LoginPage";
import Logout from "./components/Logout";
import RegistrationForm from "./components/registration/Registration";
import Dashboard from "./components/dashboard/Dashboard";
import { RecipeProvider } from "./components/recipeComponent/RecipeContext";
import AboutUs from "./components/aboutUs/AboutUs";
import RecipeComponent from "./components/recipeDetails/RecipeDetails";
import VegetarianComponent from "./components/recipeDetails/VegetarianComponent";
import VeganComponent from "./components/recipeDetails/VeganComponent";
import NonVegComponent from "./components/recipeDetails/NonVegComponent";
import KetoComponent from "./components/recipeDetails/KetoComponent";
import PaleoComponent from "./components/recipeDetails/PaleoComponent";
import CategoryPage from "./components/CategoryPage";

function App() {
  const [loading, setLoading] = useState(false);

  // Invoking function for fetching users Data on intial page load
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className="main-container">
      <RecipeProvider>
        <Router>
        
          <Header />
          <Routes>
          <Route path="/category/:category" component={CategoryPage} />
          <Route path="/recipe/:id" component={RecipeComponent} />
          <Route path="/recipes/Vegetarian" component={VegetarianComponent} />
          <Route path="/recipes/Vegan" component={VeganComponent} />
          <Route path="/recipes/Non-Vegetarian" component={NonVegComponent} />
          <Route path="/recipes/Keto" component={KetoComponent} />
          <Route path="/recipes/Paleo" component={PaleoComponent} />
     
            <Route path="/" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationForm />} />
            {/* <Route path="/recipes/:category" element={<RecipeDetails />} /> */}
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </Router>
      </RecipeProvider>
    </div>
  );
}

export default App;
