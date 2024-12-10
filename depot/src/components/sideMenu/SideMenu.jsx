import React, { useState , useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { cart } from "../../api/api";
export default function SideMenu({ isOpen, toggleMenu }) {
  const [user, setUser] = useState(localStorage.getItem("name"));
  const [id, setId] = useState(localStorage.getItem("id"));
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const {data , isLoading} = cart(id)
  const [account , setAccount] = useState("")
  const [price , setPrice] = useState(0)
  function loopingOnPrice() {
    let sum = 0;
    account?.user_carts?.forEach((product) => {
      if (product.publishedAt) {
        sum += product.totalPrice;
       
        
      }
    });
    setPrice(sum);
    
  
  }
  useEffect(() => {
    loopingOnPrice()
    setAccount(data?.data)
  },);
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
          <NavLink to={"/cart"}>Cart</NavLink>
          <p>{price} $</p>
        </li>

        <li>
          <CiHeart />
          <NavLink to={"/shop/wishList"}>Wishlist</NavLink>
        </li>

        <li>
          <FaRegUser />
          {user ? (
            <NavLink to={"/account"}>{account?.username}</NavLink>
          ) : (
            <NavLink to={"/logIn"}>Login</NavLink>
          )}
        </li>
      </ul>
    </div>
  );
}
