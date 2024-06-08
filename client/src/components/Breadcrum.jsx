import React from "react";
import { IoIosArrowForward } from "react-icons/io";

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export const Breadcrum = ({ product }) => {
  return (
    <div className="breadcrum">
      Home <IoIosArrowForward /> Shop <IoIosArrowForward />
      {toTitleCase(product.category)}
      <IoIosArrowForward />
      {product.title}
    </div>
  );
};
