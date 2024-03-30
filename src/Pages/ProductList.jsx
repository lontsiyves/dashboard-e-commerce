import React, { useState, useEffect } from "react";
import Select from "react-select";
import Loading from "../components/atoms/Loading";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProduct] = useState([]);
  const [records, setRecords] = useState([]);
  const [ordre, setOrdre] = useState("ASC");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = Array.from(new Set(products.map((res) => res.category)));

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

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const res = json.sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
        return res;
      })
      .then((data) => {
        console.log(data);
        setProduct(data);
        setRecords(data);
        setLoading(false);
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
            color={"#000000"}
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
                <table
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
                              <i className="fas fa-fw fa-edit" />{" "}
                              <i className="fas fa-fw fa-trash" />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
