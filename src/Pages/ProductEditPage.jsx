import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import EditProductForm from "../components/atoms/EditProductForm";
import Loading from "../components/atoms/Loading";
import { ErrorNotify,SuccessNotify } from "../lib/notify";
export default function ProductEditPage() {
  const { id } = useParams();

  const [product, setProduct] = useState();

  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/categories`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => setCategory(data))
      .catch((error) => {
        ErrorNotify(error);
        console.error(error);
      });
  }, []);

  const handleSave = ({ title, price, description, image, category }) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        price,
        description,
        image,
        category,
      }),
    })
      .then((response) => {
        if (response.ok) {
          SuccessNotify('Success');
          console.log(" EDIT RESP: ", response)
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => console.log(data))
      .catch((error) => {
        ErrorNotify(error);
        console.error(error);
      });
  };

  return (
    <div className="container-fluid">
      <div>
        <h2 className="text-primary">Mise à jour :</h2>
        <h4> {product?.title}</h4>

        {product ? (
          <EditProductForm
            product={product}
            categories={category}
            onSave={handleSave}
          />
        ) : (
          <Loading
            type={"spokes"}
            color={"#4e73df"}
            width={"20%"}
            height={"20%"}
          />
        )}
      </div>{" "}
      <ToastContainer />
    </div>
  );
}
