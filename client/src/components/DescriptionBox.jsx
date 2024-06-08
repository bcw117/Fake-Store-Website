import React from "react";

export const DescriptionBox = ({ product }) => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">
          Reviews ({product.rating.count})
        </div>
      </div>
      <div className="descriptionbox-description">{product.description}</div>
    </div>
  );
};
