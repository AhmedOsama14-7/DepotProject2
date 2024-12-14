import React, { useEffect, useState } from "react";
import { accountDetails, getProducts } from "../../api/api";
import { useQuery } from "react-query";
import ProductCard from "../../components/productCard/ProductCard";
import WishListCard from "../../components/wishListCard/WishListCard";
import Loader from "../../components/loader/Loader";
import { NavLink } from "react-router-dom";
export default function WishList() {
  const [id, setId] = useState(localStorage.getItem("id"));

  const { data, isLoading } =  accountDetails(id)  
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    setProducts(data?.data);
  },);

  if (isLoading) return <Loader></Loader>
  return (
    <section className="wishlist">
      <div className="wishlistBanner">
        <h4>Whislist</h4>
      </div>

      <div className="productsContainer">
        {products ? 
        products.user_wish_lists?.length >= 1 ?
        products?.user_wish_lists?.map((product) => <WishListCard publishedAt={product.publishedAt} img={product.url} id={product.documentId} name={product.name} price={product.price}></WishListCard>)
        
        :
        <div className="noProducts">
        <h6>No Products Added</h6>
        <div>

        <NavLink to={"/shop"}>Redirect to shop</NavLink>
        </div>
      </div>
        : 
          <>
            <div className="noAccount">
              <h6>Please LogIn fist</h6>
              <div>

              <NavLink to={"/login"}>Redirect to login</NavLink>
              </div>
            </div>
          </>
        }
      </div>
      
    </section>
  );
}
