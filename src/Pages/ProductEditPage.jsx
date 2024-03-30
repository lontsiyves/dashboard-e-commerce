import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import EditProductForm from "../components/atoms/EditProductForm";
import Loading from "../components/atoms/Loading";

export default function ProductEditPage() {
  const { id } = useParams();

  const [product, setProduct] = useState();

  const [category, setCategory] = useState(null);

  console.log("params: ", id);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
      });
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategory(json));
  }, []);

  const handleSave = (editedProduct) => {
    // Here you would typically send the updated product data to the server
    console.log("Updated product:", editedProduct);

    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: editedProduct.title,
        price: editedProduct.price,
        description: editedProduct.description,
        image: editedProduct.image,
        category: editedProduct.category,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  return (
    <div>
      <h2>Edit Product {id}</h2>

      {product ? (
        <EditProductForm
          product={product}
          categories={category}
          onSave={handleSave}
        />
      ) : (
        <Loading
          type={"spokes"}
          color={"#000000"}
          width={"20%"}
          height={"20%"}
          className={"4e73df"}
        />
      )}
    </div>
  );
}
