import React, { useState, useEffect } from "react";
import { fetchProducts, fetchcategories } from "../Store/Action";
import { connect } from "react-redux";
import Loading from "../components/atoms/Loading";
import { Link } from "react-router-dom";

const Home = (props) => {
  useEffect(() => {
    props.loadproduct();
  }, []);

  useEffect(() => {
    props.loadcategories();
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Tableau de bord</h1>
      </div>
      <div className="row">
        {props.products.loading ? (
          <Loading
            type={"spokes"}
            color={"#4e73df"}
            width={"20%"}
            height={"20%"}
            className={"4e73df"}
          />
        ) : (
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        <Link to={`/dashboard/product`}>
                          <i className="fas fa-fw fa-list" /> Nombre de PRODUIT
                        </Link>
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {props.products?.productlist?.length}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-list fa-2x text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        nombre de categorie
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {props.products.categorielist?.length}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-list fa-2x text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
    loadproduct: () => dispatch(fetchProducts()),
    loadcategories: () => dispatch(fetchcategories()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
