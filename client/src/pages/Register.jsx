import React, { useState } from "react";
import axios from "axios";
import "../index.css";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    if (
      !name.replace(/\s/g, "") ||
      !email.replace(/\s/g, "") ||
      !password.replace(/\s/g, "")
    ) {
      return alert("Please enter all fields");
    }

    try {
      await axios.post("/register", {
        name: name,
        email: email,
        password: password,
      });
    } catch (err) {
      alert("There was an error with registering");
    }
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <h1 className="text-4xl">Register for an Account</h1>
        <form className="signin-fields" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
