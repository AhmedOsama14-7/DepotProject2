import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LinksMenu from "../linksMenu/LinksMenu";
import { FaRegUser } from "react-icons/fa";
import "animate.css";
import { FaBars } from "react-icons/fa6";
import SideMenu from "../sideMenu/SideMenu";
import { CiHeart } from "react-icons/ci";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
  
 
  return (
    <header>
      <LinksMenu></LinksMenu>
      <div className="logo">
        <img
          src="https://depot.qodeinteractive.com/wp-content/themes/depot/assets/img/logo.png"
          alt="logo"
        ></img>
      </div>

      <div className="cart-acount">
        <div className="cartContainer">
          <NavLink to={"/"}>Cart</NavLink>
          <p>($0)</p>

          <div className="cartItems animate__animated animate__fadeIn animate__fast">
            <p>No product in the cart</p>
          </div>
        </div>

        <div className="wishlist">
        <CiHeart />
        </div>

        <div className="acountContainer">
          <FaRegUser />
          <NavLink to={"/logIn"}>Login</NavLink>
        </div>
      </div>

      <div className="sideMenuIcon">
        <p>Menu</p>
        <FaBars onClick={toggleMenu}/>
      </div>

      <SideMenu isOpen={isOpen} toggleMenu={toggleMenu} ></SideMenu> 
    </header>
  );
}
