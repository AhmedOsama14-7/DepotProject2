import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LinksMenu from "../linksMenu/LinksMenu";
import { FaRegUser } from "react-icons/fa";
import "animate.css";
import { FaBars } from "react-icons/fa6";
import SideMenu from "../sideMenu/SideMenu";
import { CiHeart } from "react-icons/ci";
import { cart } from "../../api/api";
import { FaXmark } from "react-icons/fa6";
import { useMutation, useQueryClient } from "react-query";
import { AxiosConfig } from "../../axios/axiosConfig";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
const queryClient = useQueryClient()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [name, setName] = useState(localStorage.getItem("name"));
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

  const deleteMutation = useMutation({
    mutationKey: ["cart"],
    mutationFn: async (id) => {
      await AxiosConfig(`user-carts/${id}?populate=*`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }); 
    },onSuccess: () => {
      queryClient.invalidateQueries(["cart"])

    },
  });

  const deleteProduct = (id) => {
    deleteMutation.mutate(id)
  }
  useEffect(() => {
    setName(localStorage.getItem("name"));
    loopingOnPrice()
    setAccount(data?.data)
  },);
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
          <NavLink to={"/cart"}>Cart</NavLink>
          <p>{price}$</p>

          <div className="cartItems animate__animated animate__fadeIn animate__fast">
            {
              account?.user_carts?.length > 1 ? 
              
              <div>
                <div className="body">
                  {
                    account?.user_carts?.map((product) => (
                      <div className={`productCard ${product.publishedAt ? "" : "hide"}`}>
                        <div className="img">
                          <img src={product.url} alt={product.name} />
                        </div>
                        <div className="details">
                          <p>{product.name}</p>
                          <p>{product.quantity} x {product.price}</p>
                        </div>
                        <div className="xmark">
                          <FaXmark onClick={() => deleteProduct(product.documentId)}></FaXmark>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="footer">
                  <div className="totalPrice">
                    <p>Total</p>
                    <p>{price} $</p>
                  </div>

                  <div className="buttons">
                    <button onClick={() => navigate("/cart")}>View Cart</button>
                    <button onClick={() => navigate("/checkout")}>View checkout</button>
                  </div>
                </div>
              </div>

              :

              <p>No product in the cart</p>

            }
          </div>
        </div>

        <div className="wishlist">
          <NavLink to={"/shop/wishList"}>
            <CiHeart />
          </NavLink>
        </div>

        <div className="acountContainer">
          <FaRegUser />
          {name ? (
            <NavLink className={name} to={"/account"}>
              {account?.username}
            </NavLink>
          ) : (
            <NavLink to={"/logIn"}>Login</NavLink>
          )}
        </div>
      </div>

      <div className="sideMenuIcon">
        <p>Menu</p>
        <FaBars onClick={toggleMenu} />
      </div>

      <SideMenu isOpen={isOpen} toggleMenu={toggleMenu}></SideMenu>
    </header>
  );
}
