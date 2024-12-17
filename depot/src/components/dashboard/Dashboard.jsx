import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { use } from "react";
export default function Dashboard({ isAdmin }) {
  const [active , setActive] =useState(true)
  function determineWidth (){
    if(window.innerWidth < 660){
      setActive(false)
    }
  }
  function setUlActive(){
    setActive(!active)
  }
  useEffect(()=>{
    determineWidth()
    console.log(active);
  },[])
  return (
    <div className={`dashboard  ${isAdmin ? "" : "hide"}`}>
      <nav className="dashboardNav">
        <h6>
          Dash Board <FaCaretDown onClick={setUlActive} />
        </h6>
        <ul className={`${active ? "" : "hide"}`}>
          <li>
            <NavLink to={"/admin-dashboard"} end>Users</NavLink>
          </li>
          <li>
            <NavLink  to={"/admin-dashboard/products"}>products</NavLink>
          </li>
          <li>
            <NavLink to={"/admin-dashboard/orders"}>orders</NavLink>
          </li>{" "}
          <li>
            <NavLink to={"/admin-dashboard/newProducts"}>new Products</NavLink>
          </li>{" "}
          <li>
            <NavLink to={"/admin-dashboard/admins"}>admins</NavLink>
          </li>
        </ul>
      </nav>

      <div className="container">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
