import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../CommonUI/Input";
import Button from "../CommonUI/Button";
import Dropdown from "../CommonUI/Dropdown";
import "./Registration.css";
import Alert from "@mui/material/lab/Alert";
import AlertTitle from "@mui/material/lab/AlertTitle";

const RegistrationForm = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    foodInterest: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
 

  const checkDuplicateEmail = async (e) => {
    const {
      email
    } = formData;

    axios.get("http://localhost:3030/users").then((response) => {
      const userExists = response.data.some((user) => user.email === email && user.email!== '');
      if (userExists) {
        alert("Email already exists");
        navigate("/");
      } else {
       navigate('/dashboard');
      };
    }).catch ((error) => {
      console.error('Error fetching user:', error);
  });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword, foodInterest } = formData;
    let formErrors = {};
    let isValid = true;
    if (!firstName) {
        formErrors.firstName = 'First name is required';
        isValid = false;
    }

    if (!lastName) {
        formErrors.lastName = 'Last name is required';
        isValid = false;
    }

    if (!email) {
        formErrors.email = 'Email is required';
        isValid = false;
    } else if (!validateEmail(email)) {
        formErrors.email = 'Email is invalid';
        isValid = false;
    }

    if (!password) {
        formErrors.password = 'Password is required';
        isValid = false;
    }else if (!validatePassword(formData.password)) {
      formErrors.password ="Password must be at least 8 characters long and contain both letters and numbers";
      isValid = false;
    }

    if (!confirmPassword) {
      formErrors.confirmPassword = 'Confirm Password is required';
      isValid = false;
  }

    if (password.length !== confirmPassword.length) {
        formErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
    }

    if (!foodInterest) {
      formErrors.foodInterest = 'Food Interest is required';
      isValid = false;
  }

    setErrors(formErrors);  

    // Check if email already exists
    const emailExists = await checkDuplicateEmail(formData.email);
    if (emailExists) {
      setMessage("User already exists.");
      setIsSubmitting(false);
      return;
    }else if(formData !== ''){
      setIsSubmitting(true);
    } 

    try {
      const response = await axios.post('http://localhost:3030/users', formData);
      const userArray = response.data;
      setFormData(userArray); 
      setSuccess(response.data.message);
      setError('');
  } catch (err) {
      setError(err.response.data.message || 'An error occurred');
      setSuccess('');
  }

    if (Object.keys(formErrors).length === 0 && formData!=='') {
      <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This is a success Alert with an encouraging title.
        </Alert>
      navigate("/dashboard");
    }else if(formData.length === 0){
      <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      This is an error Alert with a scary title.
    </Alert>
    }

    return isValid;
  };

  return (
    <form className="registration-page" onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <Input
          type="text"
          id="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
      </div>

      <div>
        <label>Last Name:</label>
        <Input
          type="text"
          id="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          />
        {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
      </div>

      <div>
        <label>Email:</label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <label>Password:</label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <div>
        <label>Confirm Password:</label>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword}</p>
        )}
      </div>

      <div>
        <label>Food Interest:</label>
        <Dropdown
          id="foodInterest"
          value={formData.foodInterest}
          onChange={handleChange}
        ></Dropdown>
        {errors.foodInterest && (
          <p style={{ color: "red" }}>{errors.foodInterest}</p>
        )}
      </div>

      <Button
        type="submit"
        className="btn button-primary"
        disabled={isSubmitting}
      >
        Register
      </Button>
    </form>
  );
};

export default RegistrationForm;
