import React from "react";

export default function AdditionalInformation({ product }) {
  return (
    <div className="addInfo">
      <h6>Additional Information</h6>
      <div>
        <p>Weight</p>
        <p>{product.data.wieght} kg</p>
      </div>
      <div>
        
        <p>Dimensions</p>
        <p>{product.data.dimensions}</p>
      </div>
      <div>
        <p>color</p>
        <p>{product.data.colour}</p>
      </div>
      <div>
        <p>material</p>
        <p>{product.data.material}</p>
      </div>
    </div>
  );
}
