import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../index.css";
axios.defaults.withCredentials = true;

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/login", { email, password });
      navigate("/");
      window.location.reload();
    } catch (err) {
      return alert(err.message);
    }
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <p className="text-4xl">Sign In</p>
        <form className="signin-fields" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Login</button>
          <p>
            Don't have an account?{" "}
            <Link to="/register">
              <span className="text-blue-700">Create One</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
