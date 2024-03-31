import React, { useState, useEffect } from "react";
import Select from "react-select";
import Loading from "../components/atoms/Loading";
//import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProductListTable from '../components/atoms/ProductListTable'

import { ErrorNotify } from "../lib/notify";

export default function ProductListPage() {
  const [products, setProduct] = useState([]);

  //const [records, setRecords] = useState([]);

  const [ordre, setOrdre] = useState("ASC");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = Array.from(new Set(products.map((response) => response.category)));

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

  const deleteProduct = async (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        const response = data.sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
        return response;
      })
      .then((data) => {
        setProduct(data);
       // setRecords(data);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => {
        ErrorNotify(error);
        console.error(error);
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
                  options={categoryOptions}
                  onChange={(selectOption) => setSelectedCategory(selectOption)}
                  value={selectedCategory}
                  className="mx-5"
                />
              </div>
            </form>

            <div className="card-body">
              <div className="table-responsive">
                <ProductListTable  data={filterProducts}
                search={search}
                itemsPerPage={5}
                 deleteProduct={deleteProduct}
                 sortByPrice={sortByPrice} 
              />
                {/*<table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing={0}
                >
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Categorie</th>
                      <th className="cursor" onClick={() => sortByPrice()}>
                        Prix
                        <span>&nbsp;↑</span>
                        <span>&nbsp;↓</span>
                      </th>
                      <th>Notation</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterProducts
                      .filter((item) => {
                        return search.toLowerCase() === ""
                          ? item
                          : item.title.toLowerCase().includes(search);
                      })
                      .map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <Link to={`/products/${item.id}`}>
                                {item.title}
                              </Link>
                            </td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td>{item.rating.rate}</td>

                            <td>
                              {" "}
                              <Link to={`/products/${item.id}/edit`}>
                                <i className="fas fa-fw fa-edit" />{" "}
                              </Link>
                              <span onClick={() => deleteProduct(item.id)}>
                                <i className="fas fa-fw fa-trash" />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>*/}
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
