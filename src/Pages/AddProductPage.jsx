import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
//import { ErrorNotify } from "../lib/notify";

import AddProductForm from "../components/module/AddProductForm";

export default function AddProductPge() {
  const [category, setCategory] = useState(null);

  const handleAddProduct = ({ title, price, description, image, category }) => {
    console.log("title: ",title)
    /*fetch(`${process.env.REACT_APP_API_URL}/products/`, {
      method: "POST",
      body: JSON.stringify({
        title,
        price,
        description,
        image,
        category,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((json) => console.log(json))
      .catch((error) => {
        ErrorNotify(error);
      });*/
  };

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
        console.error(error);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div>
        <h2>Ajouter un produit</h2>
        <AddProductForm categories={category} onSubmit={handleAddProduct} />
      </div>
      <ToastContainer />
    </div>
  );
}
