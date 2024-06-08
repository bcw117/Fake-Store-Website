import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Breadcrum } from "../components/Breadcrum";
import { DetailedProduct } from "../components/DetailedProduct";
import { DescriptionBox } from "../components/DescriptionBox";
import { RelatedProducts } from "../components/RelatedProducts";
import "../index.css";

export const Product = () => {
  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/" + productId)
      .then((res) => res.json())
      .then((json) => setProductInfo(json));
  }, [productId]);

  return (
    <div>
      {productInfo ? (
        <>
          <Breadcrum product={productInfo} />
          <DetailedProduct product={productInfo} />
          <DescriptionBox product={productInfo} />
          <RelatedProducts product={productInfo} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
