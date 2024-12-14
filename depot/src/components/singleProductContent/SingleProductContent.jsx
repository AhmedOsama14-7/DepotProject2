import React, { useState , useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import SingleProductTabs from "../singleProductTabs/SingleProductTabs";
import ImgGallerySwipper from "../imgGallerySwipper/ImgGallerySwipper";
import { useMutation, useQueryClient } from "react-query";
import { AxiosConfig } from "../../axios/axiosConfig";
import {cart} from "../../api/api"
export default function SingleProductContent({ product }) {
  const [counter, SetCounter] = useState(1);

  const [actiecGallery, SetActiveGallery] = useState(false);
  
  const [id, setId] = useState(localStorage.getItem("id"));
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  function handleActive() {
    SetActiveGallery(!actiecGallery);
  }
  const minError = () => toast.error("Cannot Choose Less than 1");
  const maxError = () => toast.error("Cannot Choose more than 10");

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

  const addToWishList =  useMutation({
    mutationKey: ["wish-list"],
    mutationFn: async () =>
    await AxiosConfig(`user-wish-lists?populate=*`, {
        method: "POST",
        data: {
          data: {
            url: product.data.url,
            name: product.data.name,
            price: product.data.price,
            productId: product.data.documentID,
            users_permissions_users: [parseInt(id)],
          },
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      }),
    onSuccess: () => {
      toast.success("Product added to wish list");
      queryClient.invalidateQueries(["cart"]);
    }, onError: (err) => {
      if(err.status == 403){
        toast.error("please login first")
      }
    }
  });
  const addToCart = useMutation({
    mutationKey: ["cart"],
    mutationFn: async () =>
      await AxiosConfig(`user-carts?populate=*`, {
        method: "POST",
        data: {
          data: {
            url: product.data.url,
            name: product.data.name,
            price: product.data.price,
            productId: product.data.documentId,
            quantity: counter ,
            totalPrice: (counter ) * product.data.price,
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
  
 

  const {data , isLoading} = cart(id)
  const [sameProducts , setSameProducts] = useState()
  useEffect(()=>{
    setSameProducts(data?.data)
  })
  const addingToWishList = () => {
    const isInWishList = sameProducts?.user_wish_lists?.some(product => product.productId === product.data.documentId  )
    
    if(isInWishList){
      toast.success("Product is already in wish list" , {
        icon:"🖤"
      });
    }else{
      addToWishList.mutate();
    }
  };
  const addToCartClick = () => {
    const isInCart = sameProducts?.user_carts?.some(item => item.productId === product.data.documentId )
    
    if(isInCart){
      toast.success("Product is already in cart" , {
        icon:"🛒"
      });
    }else{
      addToCart.mutate();
    }
      
  }
  const categories =
    product?.attributes?.categories?.map((cat) => cat.category) || [];
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
      <div className="singleProductContent">
        <div className="content">
          <div className="img">
            <div className="smallImg">
              <div className="smallImgWrapper " onClick={handleActive}>
                <img
                  src={product.data.url}
                  loading="lazy"
                  alt={product.data.name}
                  className="right"
                />
              </div>
              <div className="smallImgWrapper" onClick={handleActive}>
                <img
                  src={product.data.url}
                  loading="lazy"
                  alt={product.data.name}
                  className="top"
                />
              </div>
              <div className="smallImgWrapper" onClick={handleActive}>
                <img
                  src={product.data.url}
                  loading="lazy"
                  alt={product.data.name}
                  className="left"
                />
              </div>
              <div className="smallImgWrapper" onClick={handleActive}>
                <img
                  src={product.data.url}
                  loading="lazy"
                  alt={product.data.name}
                  className="bottom"
                />
              </div>
            </div>
            <div className="bigImg" onClick={handleActive}>
              <img
                src={product.data.url}
                loading="lazy"
                alt={product.data.name}
              />
            </div>
          </div>

          <div className="info">
            <div className="head">
              <h3>{product.data.name}</h3>
              <div className="price">
                <p className="actuallPrice">{product.data.price} $</p>
                <p className="sale">
                  {product.data.sale ? `${product.data.sale}  $` : ""}{" "}
                </p>
              </div>
            </div>
            <div className="body">
              <p className="desc">{product.data.description}</p>
              <div className="categories">
                <h6>Categories : </h6>
                <p>{product.data.categories[0].category}</p>
              </div>
              <div className="buttons">
                <div className="quantity">
                  <div>
                    <p>Quantity</p>
                  </div>
                  <div className="quantityCounter">
                    <FaCaretLeft onClick={decremnt} />
                    <p> {counter} </p>
                    <FaCaretRight onClick={incremnt} />
                  </div>
                </div>

                <button className="addToCart" onClick={addToCartClick }>{addToCart.isLoading ? "Adding to cart..." : "add to cart"}</button>
              </div>

              <div className="wishlist">
                <p onClick={addingToWishList}>
                  <FaHeart />
                </p>
                <p>Add to wishlist</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`ImgGallery ${
            actiecGallery ? "active" : ""
          } animate__animated animate__fadeIn  animate__faster`}
          onClick={handleActive}
        >
          <ImgGallerySwipper
            img1={
              <div className="bigImg">
                <img
                  src={product.data.url}
                  loading="lazy"
                  alt={product.data.name}
                />
              </div>
            }
            img2={
              <div className="smallImgWrapper">
                <img
                  src={product.data.url}
                  loading="lazy"
                  alt={product.data.name}
                  className="right"
                />
              </div>
            }
            img3={
              <div className="smallImgWrapper">
                <img
                  src={product.data.url}
                  loading="lazy"
                  alt={product.data.name}
                  className="top"
                />
              </div>
            }
            img4={
              <div className="smallImgWrapper">
                <img
                  src={product.data.url}
                  loading="lazy"
                  alt={product.data.name}
                  className="left"
                />
              </div>
            }
            img5={
              <div className="smallImgWrapper">
                <img
                  src={product.data.url}
                  loading="lazy"
                  alt={product.data.name}
                  className="bottom"
                />
              </div>
            }
          ></ImgGallerySwipper>
        </div>

        <SingleProductTabs product={product}></SingleProductTabs>
      </div>
    </>
  );
}
