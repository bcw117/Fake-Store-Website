import axios from "axios";
import Cookies from "universal-cookie";
import { createContext, useState, useEffect } from "react";
const cookies = new Cookies();

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const token = cookies.get("token");

  useEffect(() => {
    if (token) {
      axios
        .get("/profile", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(({ data }) => {
          if (data !== null) {
            setUser(data);
          }
        });
    }
  }, [token]);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
