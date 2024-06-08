import React, { useState, useEffect } from "react";
import { DisplayProduct } from "../components/DisplayProduct";
import "../index.css";

export const Home = () => {
  const [data, setData] = useState();

  function getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        const products = getRandom(json, 12);
        setData(products);
      });
  }, []);

  return (
    <div className="min-h-screen ">
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
    </div>
  );
};
