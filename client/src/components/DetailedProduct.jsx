import React, { useContext } from "react";
import { Rating } from "@mui/material";
import { ShopContext } from "../context/ShopContext";

export const DetailedProduct = ({ product }) => {
  const { increaseCartQuantity, queryCartItem } = useContext(ShopContext);

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <div className="productdetail">
      <img src={product.image} alt={product.title} />
      <div className="productdetail-right">
        <h1>{product.title}</h1>
        <div className="productdetail-right-star">
          <Rating
            name="half-rating-read"
            defaultValue={product.rating.rate}
            precision={0.1}
            readOnly
          />
          <p>({product.rating.count})</p>
        </div>
        <div className="productdetail-right-prices">
          ${product.price.toFixed(2)}
        </div>
        <div className="productdetail-right-description">
          {product.description}
        </div>
        <button
          onClick={() => {
            increaseCartQuantity(product);
            queryCartItem(product);
          }}
        >
          Add to Cart
        </button>
        <div className="productdetail-right-category">
          <span>Category: </span>
          {toTitleCase(product.category)}
        </div>
      </div>
    </div>
  );
};
