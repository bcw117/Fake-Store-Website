import React from "react";
import { Link } from "react-router-dom";

export const DisplayProduct = ({ entry: product }) => {
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <div className="item p-14">
      <Link
        to={`/product/${product.id}`}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <img
          className="mx-auto my-20 h-40"
          src={product.image}
          alt={product.title}
        />
        <div className="mt-20">
          <h2 className="text-lg text-start font-semibold">{product.title}</h2>
          <h4 className="text-start">{toTitleCase(product.category)}</h4>
          <h3 className="text-start font-semibold">
            ${product.price.toFixed(2)}
          </h3>
        </div>
      </Link>
    </div>
  );
};
