import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ProductListTable from "../components/module/ProductListTable";
import Loading from "../components/atoms/Loading";
import { SuccessNotify } from "../lib/notify";
import {  } from "react-redux";
import { fetchProducts, removeProduct, fetchcategories,sortByPrice ,sortByRating,sortName} from "../Store/Action";

const ProductListPage = (props) => {
  useEffect(() => {
    props.loadproduct();
  }, []);
  useEffect(() => {
    props.loadcategories();
  }, []);
  useEffect(()=> {
    const data = fetch('https://fakestoreapi.com/users/')
            .then(res=>res.json())
            .then(json=>console.log("USER",json))
  })

  const [products, setProduct] = useState(props.products.productlist);

  const [ordre, setOrdre] = useState("ASC");

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);

  const filterProducts = selectedCategory
    ? props?.products?.productlist?.filter(
        (p) => p.category === selectedCategory.value
      )
    : props?.products?.productlist;

  const sortByPrice = async () => {
    if (ordre === "ASC") {
      props.byPrice(ordre);
      setOrdre("DSC");
    } else {
      props.byPrice(ordre);
      setOrdre("ASC");
    }
  
  };

  const sortByRating = async () => {
    if (ordre === "ASC") {
      props.byRating(ordre);
      setOrdre("DSC");
    } else {
      props.byRating(ordre);
      setOrdre("ASC");
    }
  };

  const sortByName = async () => {
    if (ordre === "ASC") {
      props.byName(ordre);
      setOrdre("DSC");
    } else {
      props.byName(ordre);
      setOrdre("ASC");
    }
  };

  const deleteProduct = async (productId) => {
    if (window.confirm("supprimer le produit ?")) {
      props.removeproduct(productId);
      props.loadproduct();
      SuccessNotify("Supprimé avec succès");
    }
  };

  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Liste des Produits
          </h6>
        </div>

        {props.products.loading ? (
          <Loading
            type={"spokes"}
            color={"#4e73df"}
            width={"20%"}
            height={"20%"}
            className={"4e73df"}
          />
        ) : props.products.errmessage ? (
          <div className="text-danger">{props.products.errmessage}</div>
        ) : (
          <div>
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search py-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Recherche par Nom..."
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <Select
                  isClearable
                  placeholder="Select a category"
                  options={props?.products.categorielist}
                  onChange={(selectOption) => setSelectedCategory(selectOption)}
                  value={selectedCategory}
                  className="mx-5"
                />
              </div>
            </form>
            <Link className="btn btn-primary" to={"/dashboard/product/add"}>
              Ajouter Produit
            </Link>

            <div className="card-body">
              <div className="table-responsive">
                <ProductListTable
                  data={filterProducts}
                  search={search}
                  itemsPerPage={5}
                  deleteProduct={deleteProduct}
                  sortByPrice={sortByPrice}
                  sortByRating={sortByRating}
                  sortByName={sortByName}
                />
              </div>
            </div>
          </div>
        )}
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
    loadproduct: () => dispatch(fetchProducts()),
    loadcategories: () => dispatch(fetchcategories()),
    removeproduct: (id) => dispatch(removeProduct(id)),
    byPrice: (ordre) => dispatch(sortByPrice(ordre)),
    byName: (ordre) => dispatch(sortName(ordre)),
    byRating: (ordre) => dispatch(sortByRating(ordre)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
