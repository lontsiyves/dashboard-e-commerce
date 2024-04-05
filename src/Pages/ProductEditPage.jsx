import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";

import EditProductForm from "../components/module/EditProductForm";

import Loading from "../components/atoms/Loading";
import { useNavigate } from "react-router-dom";
import { ErrorNotify } from "../lib/notify";
import { FunctionUpdateProduct } from "../Store/Action";
import { useDispatch } from "react-redux";
import { fetchProduct, fetchcategories } from "../Store/Action";

const ProductEditPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    props.loadcategories();
  }, []);

  useEffect(() => {
    props.loadproduct(id);
  }, [id]);

  const handleSave = ({ title, price, description, image, category }) => {
    dispatch(
      FunctionUpdateProduct({ title, price, description, image, category }, id)
    );
    navigate("/dashboard/product");
  };

  return (
    <div className="container-fluid">
      <div>
        <h2 className="text-primary">Mise à jour :</h2>

        {Object.keys(props.products.productobj).length > 0 && (
          <h4> {props.products.productobj.title}</h4>
        )}

        {props.products.loading ? (
          <Loading
            type={"spokes"}
            color={"#4e73df"}
            width={"20%"}
            height={"20%"}
          />
        ) : props.products.errmessage ? (
          <div className="text-danger">{props.products.errmessage}</div>
        ) : (
          Object.keys(props.products.productobj).length > 0 && (
            <EditProductForm
              product={props.products.productobj}
              categories={props.products.categorielist}
              onSubmit={handleSave}
            />
          )
        )}
      </div>{" "}
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
    loadproduct: (id) => dispatch(fetchProduct(id)),

    loadcategories: () => dispatch(fetchcategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditPage);
