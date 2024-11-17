import React, { useContext, useEffect } from "react";
import ProductCard from "../productCard/ProductCard";
import Filter from "../filter/Filter";
import { getProducts, getSingleproduct } from "../../api/api";
import Loader from "../loader/Loader";
import QuickLook from "../quickLook/QuickLook";
import { useState } from "react";
import ShopRoutesContainer from "../shopRoutesConatiner/ShopRoutesContainer";
import CategoryMenu from "../categoryMenu/CategoryMenu";
import {
  sortByNameAsc,
  sortByNameDesc,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByRating,
} from "../../scripts/filter";

export default function ProductsContainer({ routes }) {
  const [active, SetActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState("priceAsc");

  
  const { data, isFetching } =  getProducts();
  const [sortedProducts , setSortedProducts ] = useState([])
  
  const handleCardClick = (product) => {
    SetActive(true);
    setSelectedProduct(product);
  };
  const handleFilter = async (filter) => {
    let sortedProducts;

    switch (filter) {
      case "priceAsc":
        sortedProducts = sortByPriceAsc(data?.data?.data);
        break;
      case "priceDesc":
        sortedProducts = sortByPriceDesc(data?.data?.data);
        break;
      case "nameAsc":
        sortedProducts = sortByNameAsc(data?.data?.data);
        break;
      case "nameDesc":
        sortedProducts = sortByNameDesc(data?.data?.data);
        break;
      case "rating":
        sortedProducts = sortByRating(data?.data?.data);
        break;
      // Add more cases for additional filters
      default:
        sortedProducts = data?.data?.data
    }
    setSortedProducts(sortedProducts);
  };

  useEffect(()=>{
   
      handleFilter()

  },[])
  // if (isFetching) return <Loader></Loader>;
  return (
    <>
      <ShopRoutesContainer notActive={routes}></ShopRoutesContainer>
      <div className="filterBar">
        <CategoryMenu></CategoryMenu>
        <Filter onFilter={handleFilter}></Filter>
      </div>
      <section className="productsContainer">
        {sortedProducts?.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            onclick={handleCardClick}
            slug={product.documentId}
            img={product.url}
            name={product.categories[0].category}
            price={product.price}
            sale={product.sale}
            salePrec={product.salePrecentage}
            rating={product.rating}
            category={product.categories[0].category}
            isNew={product.isNew}
          ></ProductCard>
        ))}

        {selectedProduct && (
          <QuickLook
            product={selectedProduct}
            active={active}
            SetActive={SetActive}
          ></QuickLook>
        )}
      </section>
    </>
  );
}
