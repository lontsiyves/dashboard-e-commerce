import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useParams } from "react-router-dom";
import Product from "../components/molecule/Product";
import Loading from "../components/atoms/Loading";
import { ErrorNotify } from "../lib/notify";

export default function ProductDetailPage() {
  const params = useParams();

  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${params.id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => {
        ErrorNotify(error);
      });
  }, [params.id]);

  return (
    <div className="p-4">
      <div>
        {loading ? (
          <Loading
            type={"spokes"}
            color={"#4e73df"}
            width={"20%"}
            height={"20%"}
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
      <ToastContainer />
    </div>
  );
}
