import React, { useState, useEffect } from "react";
import { DisplayProduct } from "../components/DisplayProduct";
import "../index.css";

export const Electronics = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/electronics")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  return (
    <>
      {typeof data === "undefined" ? (
        <div className="loading-page">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          {data.map((entry, i) => (
            <DisplayProduct key={i} entry={entry} />
          ))}
        </div>
      )}
    </>
  );
};
