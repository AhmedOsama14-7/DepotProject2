import React from "react";
import { NavLink } from "react-router-dom";
import "../../routes/Routes";
import { useNewProductContext } from "../../context/newProductContext";
import { useOnSaleContext } from "../../context/onSaleContext";
export default function ShopRoutesContainer({
  productName,
  notActive,
  productId,
}) {

  const {isNewProductPage} = useNewProductContext()
  const {isOnSale} = useOnSaleContext()
  
  return (
    <div className={`routesContainer ${notActive ? "hide" : ""}`}>
      <div className="routes">
        <NavLink to={"/"}>Home </NavLink>
        <p>/</p>
        <NavLink to={"/shop"}>Shop </NavLink>
        {
          isNewProductPage ? 
          <NavLink to={`/shop/newProducts`}>
            <p>/  New Products</p>
          </NavLink>
          :
          ""
        }
        {
          isOnSale ? 
          <NavLink to={`/shop/onSale`}>
            <p>/  On Sale Products</p>
          </NavLink>
          :
          ""
        }
        {productName ? (
          <NavLink to={`/shop/singleProduct/${productId}}`}>
            / {productName}
          </NavLink>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
