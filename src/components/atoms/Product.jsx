import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import React from "react";

export default function Product({ prop }) {
  return (
    <div className="card shadow mb-5">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">{prop.title}</h6>
      </div>
      <div className="card-body">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">{prop.description}</div>
          <div className="col-md-6">
            <img
              width={200}
              height={200}
              loading="eager|lazy"
              src={prop.image}
              className="rounded mx-auto d-block"
              alt={prop.title}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center pt-4">
          <div className="col-6">
            <div>
              <StarRating rating={prop.rating.rate} />
            </div>
            <div className="d-flex row">
              <div className="col-6">{prop.rating.rate}/5 </div>
              <div className="col-6"> {prop.rating.count} Vote(s)</div>
            </div>
          </div>
          <div className="col-6 font-weight-bold ">
            PRIX:{" "}
            <span className="font-weight-bold text-primary">{prop.price}</span>
          </div>
        </div>
      </div>
      <Link className="btn btn-primary" to={`/products/${prop.id}/edit`} >
        Editer
      </Link>
    </div>
  );
}
