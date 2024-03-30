import React from "react";

const StarRating = ({ rating }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star, index) => {
        return (
          <span
            key={index}
            className="start"
            style={{
              color: rating >= star ? "gold" : "gray",
              fontSize: `35px`,
            }}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
