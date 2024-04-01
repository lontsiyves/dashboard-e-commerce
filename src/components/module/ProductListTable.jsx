import React, { useState } from "react";

import { Link } from "react-router-dom";

export default function ProductListTable({
  data,
  search,
  itemsPerPage,
  deleteProduct,
  sortByPrice,
  sortByRating,
  sortByName,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <table
        className="table table-bordered"
        id="dataTable"
        width="100%"
        cellSpacing={0}
      >
        <thead>
          <tr>
            <th onClick={() => sortByName()}>
              Nom <span>&nbsp;↑</span>
              <span>&nbsp;↓</span>
            </th>
            <th>Categorie</th>
            <th className="cursor" onClick={() => sortByPrice()}>
              Prix
              <span>&nbsp;↑</span>
              <span>&nbsp;↓</span>
            </th>
            <th className="cursor" onClick={() => sortByRating()}>
              Notation<span>&nbsp;↑</span>
              <span>&nbsp;↓</span>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems
            ?.filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search);
            })
            .map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`/products/${item.id}`}>{item.title}</Link>
                  </td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.rating.rate}</td>

                  <td>
                    {" "}
                    <Link to={`/products/edit/${item.id}`}>
                      <i className="fas fa-fw fa-edit" />{" "}
                    </Link>
                    <span
                      role="button"
                      onClick={() => {
                        deleteProduct(item.id);
                      }}
                    >
                      <i className="fas fa-fw fa-trash text-danger" />
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className="btn btn-primary ml-1"
            key={index}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
