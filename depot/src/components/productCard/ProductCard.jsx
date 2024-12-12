import React, { useContext, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import QuickLook from "../quickLook/QuickLook";
import { NavLink, useLocation } from "react-router-dom";
import CategoryContext from "../../context/CategoryContext";
import { FilterPrice } from "../../scripts/filter";
import { useMutation, useQueryClient } from "react-query";
import { AxiosConfig } from "../../axios/axiosConfig";
import { Toaster, toast } from "react-hot-toast";
import {accountDetails, cart} from "../../api/api"
import { useNewProductContext } from "../../context/newProductContext";
import { useOnSaleContext } from "../../context/onSaleContext";


export default function ProductCard({
  name,
  sale,
  price,
  salePrec,
  img,
  onclick,
  slug,
  category,
  isNew,
  product,
  rating
 
}) {
  const handleInnerButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const [id, setId] = useState(localStorage.getItem("id"));
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const queryClient = useQueryClient();
  const addToCart = useMutation({
    mutationKey: ["cart"],
    mutationFn: async () =>    
      await AxiosConfig(`user-carts?populate=*`, {
        method: "POST",
        data: {
          data: {
            url: img,
            name: name,
            price: price,
            productId: slug,
            totalPrice:price,
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
          data : {

            url: img,
            name: name,
            price: price,
            productId: slug,
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
    const isInWishList = sameProducts?.user_wish_lists?.some(product => product.productId === slug )
    
    if(isInWishList){
      toast.success("Product is already in wish list" , {
        icon:"🖤"
      });
    }else{
      addToWishList.mutate();
    }
  };

  const addToCartClick = (e ) => {
    const isInCart = sameProducts?.user_carts?.some(product => product.productId === slug )
    
    if(isInCart){
      toast.success("Product is already in cart" , {
        icon:"🛒"
      });
    }else{
      addToCart.mutate();
    }
  
  };

  const { categorySelected, handleCategoryChange } =
    useContext(CategoryContext);

  const [CategoryMatch, SetCategoryMatch] = useState(true);
  async function handleCategory() {
    if (categorySelected != "All") {
      if (category == categorySelected) {
        SetCategoryMatch(true);
      } else {
        SetCategoryMatch(false);
      }
    } else {
      SetCategoryMatch(true);
    }
  }
  const {isNewProductPage} = useNewProductContext()
  const {isOnSale} = useOnSaleContext()

  useEffect(() => {
    handleCategory();
    
  
}, [categorySelected]);

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
      ></Toaster>
      <div className={`productCard ${isNewProductPage ? isNew ? "" : "notActive" : isOnSale ? sale ? "" : "notActive" : CategoryMatch ? ""  : "notActive"}`}>
          <div className="img">
        <NavLink to={`/shop/singleProduct/${slug}`}>
            <img src={img} alt={slug}></img>
            <div className="header">
              <p>{isNew ? `New` : ""}</p>

              <p>{salePrec ? `${salePrec} %` : ""}</p>
            </div>

            <div className="quickLook" onClick={handleInnerButtonClick}>
              <div className="quickLookBtn">
                <p onClick={() => onclick(product)}>quick look</p>
              </div>

              <div className="heart">
                <FaHeart onClick={addingToWishList} />
              </div>
            </div>
          </NavLink>
          </div>

          <div className="body">
            <h6>{name}</h6>
            <div className="price-animation" onclick={handleInnerButtonClick}>
              <div className="price">
                <p className="sale">{sale ? `${sale} $` : ""}</p>
                <p>{price} $</p>
              </div>
              <p className="cartBtn" onClick={addToCartClick}>{addToCart.isLoading ? "Adding to cart.." : addToCart.isSuccess ? <NavLink to={"/cart"}>View Cart</NavLink> : "add to cart"}</p>
            </div>
          </div>
      </div>
    </>
  );
}
