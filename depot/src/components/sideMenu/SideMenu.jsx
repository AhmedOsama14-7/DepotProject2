import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
export default function SideMenu({ isOpen, toggleMenu }) {
  const [user , setUser ] = useState(localStorage.getItem("name"))
  return (
    <div className={`SideMenu ${isOpen ? "open" : "close"}`}>
      <FaXmark className="xmark" onClick={toggleMenu} />
      <ul className="SideLinks">
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>

        <li>
          <NavLink to={"/shop"}>Shop</NavLink>
        </li>

        <li>
          <NavLink to={"/"}>About Us</NavLink>
        </li>

        <li>
          <NavLink to={"/"}>Contact Us</NavLink>
        </li>
        <li>
          <NavLink to={"/"}>Cart</NavLink>
          <p>($0)</p>
        </li>

        <li>
          <CiHeart />
          <NavLink to={"/"}>Wishlist</NavLink>
        </li>

        <li>
        <FaRegUser /> 
          { user ?<NavLink to={"/account"} >{user}</NavLink> : <NavLink to={"/logIn"}>Login</NavLink> }
          
        </li>
      </ul>
    </div>
  );
}
