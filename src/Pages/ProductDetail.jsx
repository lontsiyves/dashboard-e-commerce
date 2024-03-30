import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import Product from "../components/atoms/Product";
import Loading from "../components/atoms/Loading";

export default function ProductDetail() {
  const params = useParams();

  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <Loading
          type={"spokes"}
          color={"#000000"}
          width={"20%"}
          height={"20%"}
          className={"4e73df"}
        />
      ) : (
        <div>
          {product ? (
            <div>
              <Product prop={product} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
