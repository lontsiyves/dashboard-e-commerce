import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import EditProductForm from "../components/module/EditProductForm";

import Loading from "../components/atoms/Loading";

import { ErrorNotify, SuccessNotify } from "../lib/notify";

export default function ProductEditPage() {

  const { id } = useParams();

  const [product, setProduct] = useState();

  const [categories, setCategories] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Un problème est survenu");
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        ErrorNotify(error);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/categories`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Un problème est survenu");
      })
      .then((data) => {
        setLoading(false);
        setCategories(data);
      })
      .catch((error) => {
        ErrorNotify(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSave = ({ title, price, description, image, category }) => {
    setLoading(true);
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
          SuccessNotify("Sauvegarde réussie");
          setLoading(false);
          return response.json();
        }
        throw new Error("Un problème est survenu");
      })
      .then((data) => console.log(data))
      .catch(() => {
        ErrorNotify("Un problème est survenu");
      }).finally(()=>{
        setLoading(false);
      });
  };

  return (
    <div className="container-fluid">
      <div>
        <h2 className="text-primary">Mise à jour :</h2>
        <h4> {product?.title}</h4>

        {!loading ? (
          <EditProductForm
            product={product}
            categories={categories}
            onSubmit={handleSave}
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
