import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { FunctionAddProduct } from "../Store/Action";
import { connect } from "react-redux";

import { fetchcategories } from "../Store/Action";

import AddProductForm from "../components/module/AddProductForm";
import { useNavigate } from "react-router-dom";

const AddProductPge = (props) => {
  useEffect(() => {
    props.loadcategories();
  }, []);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleAddProduct = ({ title, price, description, image, category }) => {
    console.log("CALLLL")

    dispatch(
      FunctionAddProduct({ title, price, description, image, category })
    );
    navigate("/dashboard/product");
  };

  return (
    <div className="container-fluid">
      <div>
        <h2>Ajouter un produit</h2>
        <AddProductForm
          categories={props.products?.categorielist}
          onSubmit={handleAddProduct}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadcategories: () => dispatch(fetchcategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductPge);
