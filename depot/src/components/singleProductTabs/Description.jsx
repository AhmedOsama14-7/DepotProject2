import React from "react";

export default function Description({ product }) {
  return (
    <div className="Description">
      <h6>Description</h6>
      <p>{product.data.description}</p>
    </div>
  );
}
