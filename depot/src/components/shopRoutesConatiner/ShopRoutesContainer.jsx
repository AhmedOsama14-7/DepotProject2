import React from 'react'
import {  NavLink } from 'react-router-dom';
import "../../routes/Routes"
export default function ShopRoutesContainer({productName ,notActive, productId}) {
  return (
    <div className={`routesContainer ${notActive ? "hide" : ""}`}>
      <div className="routes">
        <NavLink to={"/"}>Home </NavLink>  
        <p>/</p>  
        <NavLink to={"/shop"}>Shop </NavLink>   


        {productName ? 
        <NavLink to={`/shop/singleProduct/${productId}}`} >/    {productName}</NavLink> :  ""} 
        
      </div>
    </div>
  )
}
