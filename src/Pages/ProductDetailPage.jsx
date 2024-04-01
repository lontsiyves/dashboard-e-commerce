import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Product from "../components/molecule/Product";
import Loading from "../components/atoms/Loading";
import { fetchProduct } from "../Store/Action";

const ProductDetailPage = (props) => {
  const { id } = useParams();

  useEffect(() => {
    props.loadproduct(id);
  }, [id]);

  return (
    <div className="p-4">
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
        <div>
          {Object.keys(props.products.productobj).length > 0 && (
            <Product prop={props.products.productobj} />
          )}
        </div>
      )}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);
