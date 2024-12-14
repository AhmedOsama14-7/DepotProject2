import React, { useEffect, useState } from "react";
import { FaCaretLeft, FaHeart, FaCaretRight } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { CiHeart } from "react-icons/ci";
import { useMutation, useQueryClient } from "react-query";

import { AxiosConfig } from "../../axios/axiosConfig";
import {cart} from "../../api/api"
export default function QuickLook({ active, SetActive, product }) {
  const [counter, SetCounter] = useState(1);
  const [unactive, setUnactive] = useState(true);
  const [heartBtn, SetHeartBtn] = useState(false);
  const [id, setId] = useState(localStorage.getItem("id"));
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const minError = () => toast.error("Cannot Choose Less than 1");
  const maxError = () => toast.error("Cannot Choose more than 10");
  const wishlist = () => {
    if (heartBtn == true) {
      toast.success("Successfully added to WishList");
    }
  };
  function close() {
    setUnactive(true);
    SetActive(false);
  }
  function incremnt() {
    if (counter < 10) {
      SetCounter(counter + 1);
    } else {
      SetCounter(counter);
      maxError();
    }
  }

  function decremnt() {
    if (counter > 1) {
      SetCounter(counter - 1);
    } else {
      SetCounter(counter);
      minError();
    }
  }

  const queryClient = useQueryClient();
  const addToCart = useMutation({
    mutationKey: ["cart"],
    mutationFn: async () =>
      await AxiosConfig(`user-carts?populate=*`, {
        method: "POST",
        data: {
          data: {
            url: product.url,
            name: product.name,
            price: product.price,
            productId: product.documentId,
            quantity: counter ,
            totalPrice: (counter) * product.price,
            users_permissions_users: [parseInt(id)],
          },
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      toast.success("Product added to cart" , {
        icon:"🛒"
      });
    },
    onError: (err) => {
      if (err.status == 403) {
        toast.error("please login first");
      }
    },
  }); 
  const addToWishList = useMutation({
    mutationKey: ["wish-list"],
    mutationFn: async () =>
      await AxiosConfig(`user-wish-lists?populate=*`, {
        method: "POST",
        data: {
          data:{

            url: product.url,
            name: product.name,
            price: product.price,
            productId: product.documentID,
            users_permissions_users: [parseInt(id)],
          }
          
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      toast.success("Product added to wish list");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (err) => {
      if (err.status == 403) {
        toast.error("please login first");
      }
    },
  });

  
  const {data , isLoading} = cart(id)
  const [sameProducts , setSameProducts] = useState()
  useEffect(()=>{
    setSameProducts(data?.data)
  })
  const addingToWishList = () => {
    const isInWishList = sameProducts?.user_wish_lists?.some(product => product.productId === product.documentId )
    
    if(isInWishList){
      toast.success("Product is already in wish list" , {
        icon:"🖤"
      });
    }else{
      addToWishList.mutate();
    }
  };
  const addToCartClick = () => {
    const isInCart = sameProducts?.user_carts?.some(item => item.productId === product.documentId )
    
    if(isInCart){
      toast.success("Product is already in cart" , {
        icon:"🛒"
      });
    }else{
      addToCart.mutate();
    }
      
  }
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            color: "red",
          },

          success: {
            style: {
              color: "black",
            },
            icon: "🖤",
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div
        className={`quickLookPage ${unactive ? "unactive" : ""} ${
          active ? "active" : "unactive"
        }`}
      >
        <div className="quickLookSection">
          <div className="img">
            <FaXmark onClick={close} />
            <img src={product.url} loading="lazy" alt={product.name} />
          </div>

          <div className="info">
            <div className="head">
              <FaXmark onClick={close} />
              <h3>{product.name}</h3>
              <div className="price">
                <p className="actuallPrice">{product.price} $</p>
                <p className="sale">
                  {product.sale ? `${product.sale}  $` : ""}{" "}
                </p>
              </div>
            </div>
            <div className="body">
              <p className="desc">{product.description}</p>

              <div className="buttons">
                <div className="quantity">
                  <div>
                    <p>Quantity</p>
                  </div>
                  <div className="quantityCounter">
                    <FaCaretLeft onClick={decremnt} />
                    {counter}
                    <FaCaretRight onClick={incremnt} />
                  </div>
                </div>

                <button className="addToCart" onClick={addToCartClick}>{addToCart.isLoading ?  "Add to cart" : "Add to cart"}</button>
              </div>

              <div className="wishlist">
                <p onClick={addingToWishList}>
                  <FaHeart onClick={wishlist} />
                </p>
                <p>Add to wishlist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
