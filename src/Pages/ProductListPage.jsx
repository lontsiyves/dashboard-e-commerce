import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

import ProductListTable from "../components/module/ProductListTable";
import Loading from "../components/atoms/Loading";
import { ErrorNotify, SuccessNotify } from "../lib/notify";

export default function ProductListPage() {
  const [products, setProduct] = useState([]);

  const [records, setRecords] = useState([]);

  const [ordre, setOrdre] = useState("ASC");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);


  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = Array.from(
    new Set(products.map((response) => response.category))
  );

  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
  }));

  const filterProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory.value)
    : products;

  const sortByPrice = async () => {
    if (ordre === "ASC") {
      const sorted = [...filterProducts].sort((a, b) =>
        a.price > b.price ? 1 : -1
      );
      setProduct(sorted);
      setOrdre("DSC");
    } else {
      const sorted = [...filterProducts].sort((a, b) =>
        b.price > a.price ? 1 : -1
      );
      setProduct(sorted);
      setOrdre("ASC");
    }
  };

  const sortByRating = async () => {
    if (ordre === "ASC") {
      const sorted = [...filterProducts].sort((a, b) =>
        a.rating.rate > b.rating.rate ? 1 : -1
      );
      setProduct(sorted);
      setOrdre("DSC");
    } else {
      const sorted = [...filterProducts].sort((a, b) =>
        b.reting.rate > a.rating.rate ? 1 : -1
      );
      setProduct(sorted);
      setOrdre("ASC");
    }
  };

  const sortByName = async () => {
    if (ordre === "ASC") {
      const sorted = [...filterProducts].sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );
      setProduct(sorted);
      setOrdre("DSC");
    } else {
      const sorted = [...filterProducts].sort((a, b) =>
        b.title.toLowerCase().localeCompare(a.title.toLowerCase())
      );
      setProduct(sorted);
      setOrdre("ASC");
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          SuccessNotify("Supprimé avec succès");
          setLoading(false);
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .catch((error) => {
        ErrorNotify(error);
        console.error(error);
      }).finally(()=>{
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      /* .then((data) => {
        const response = data.sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
        return response;
      })*/
      .then((data) => {
        setProduct(data);
        setRecords(data);
        setLoading(false);
      })
      .catch((error) => {
        ErrorNotify(error);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Liste des Produits
          </h6>

        </div>


        {loading ? (
          <Loading
            type={"spokes"}
            color={"#4e73df"}
            width={"20%"}
            height={"20%"}
            className={"4e73df"}
          />
        ) : (null
        )}

        {filterProducts.length >0  ? (
          
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
                  options={categoryOptions}
                  onChange={(selectOption) => setSelectedCategory(selectOption)}
                  value={selectedCategory}
                  className="mx-5"
                />
              </div>
            </form>
            <Link className="btn btn-primary" to={"/products/add"} >Ajouter Produit</Link>

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
        ):(
          <div>la liste est vide</div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
