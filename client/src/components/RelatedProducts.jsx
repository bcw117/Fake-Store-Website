import React, { useEffect, useState } from "react";
import { DisplayProduct } from "./DisplayProduct";

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

export const RelatedProducts = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    fetch(
      "https://fakestoreapi.com/products/category/" +
        product.category +
        "?limit=4"
    )
      .then((res) => res.json())
      .then((json) => {
        const result = getRandom(
          json.filter((item) => item.id !== product.id),
          3
        );
        setRelatedProducts(result);
      });
  }, []);

  return (
    <div>
      {relatedProducts ? (
        <div className="relatedproducts">
          <p className="text-4xl">Related Products</p>
          <hr />
          <div className="relatedproducts-item">
            {relatedProducts.map((product, key) => {
              return <DisplayProduct entry={product} key={key} />;
            })}
          </div>
        </div>
      ) : (
        <p>No Related Products</p>
      )}
    </div>
  );
};
