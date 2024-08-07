import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const Account = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
    }
  }, [user]);

  const logout = async () => {
    try {
      await axios.delete("http://localhost:4000/logout");
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {user ? (
        <div className="account">
          <h1 className="text-3xl my-5">Account Details</h1>
          <div className="accountdetails">
            <form>
              <div className="accountentry">
                <h2 className="text-xl">Email Address</h2>
                <input
                  type="text"
                  onChange={(text) => setEmail(text)}
                  defaultValue={email}
                />
              </div>

              <div className="accountentry">
                <h2 className="text-xl">Name</h2>
                <input
                  type="text"
                  onChange={(text) => setName(text)}
                  defaultValue={name}
                />
              </div>
            </form>
            <div className="flex items-center flex-col">
              <button type="button">Save information</button>
              <button type="button" onClick={() => logout()}>
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
};
