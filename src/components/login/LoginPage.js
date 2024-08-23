import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import Input from "../CommonUI/Input";
import Button from "../CommonUI/Button";
import Alert from "@mui/material/lab/Alert";
import AlertTitle from "@mui/material/lab/AlertTitle";

const LoginPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const Registration = () => {
    navigate("/registration");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errorMessage = {};

    if (!data.email) errorMessage.email = "Email is required";
    setErrors(errorMessage);

    if (!data.password) {
      errorMessage.password = "Password is required";
    } else if (!passwordRegex.test(data.password)) {
      errorMessage.password =
        "Password must be at least 8 characters long and can contain alphabets and numerics";
    }

    await axios.post("http://localhost:3030/users", data).then((response) => {
      const userArray = [response.data];
      console.log("userArray", userArray);
      setData([response.data]);

      const email = userArray.some((response) => response.email === data.email);
      const password = userArray.some(
        (response) => response.password === data.password
      );

      if (!email)
        errorMessage.email =
          "Email id is not reggistered.Please register yourself";
      setErrors(errorMessage);

      if (!password) {
        errorMessage.password = "Invalid Password";
      }

      localStorage.setItem("user", JSON.stringify(data));
      if (response.data != null && data) {
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This is a success Alert with an encouraging title.
        </Alert>
        navigate("/dashboard");
      } else if (
        data.email === false &&
        data.password === false &&
        email === null &&
        password === null &&
        email === false &&
        password === false
      ) {
        <Alert severity="error">
  <AlertTitle>Error</AlertTitle>
  This is an error Alert with a scary title.
</Alert>
        navigate("/");
      }
    });
    setData("");
  };

  return (
    <div className="login-page">
      <h2>Login Page</h2>
      <form>
        <div>
          <label>Email : </label>
          <Input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
        <div>
          <label>Password : </label>
          <Input
            id="password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
        </div>
        <Button variant="primary" type="submit" onClick={handleLogin}>
          Log In
        </Button>
        <Button
          variant="secondary"
          className="btn button-secondary"
          type="submit"
          onClick={Registration}
        >
          Register
        </Button>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
      </form>
    </div>
  );
};

export default LoginPage;
