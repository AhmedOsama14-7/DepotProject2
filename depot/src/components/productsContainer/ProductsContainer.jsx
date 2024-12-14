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
  FilterPrice,
} from "../../scripts/filter";

export default function ProductsContainer({ routes }) {
  const limit = 8;
  const [page, setPage] = useState(1);
  const [active, SetActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data, isLoading } = getProducts(page, limit);
  const [sortedProducts, setSortedProducts] = useState(data?.data?.data);

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
      case "to80":
        sortedProducts = FilterPrice(data?.data?.data, 0, 80);
        break;
      case "to120":
        sortedProducts = FilterPrice(data?.data?.data, 80, 120);
        break;
      case "to180":
        sortedProducts = FilterPrice(data?.data?.data, 120, 180);
        break;
      case "to240":
        sortedProducts = FilterPrice(data?.data?.data, 180, 240);
        break;
      case "above240":
        sortedProducts = FilterPrice(data?.data?.data, 240, 1000);
        break;

      default:
        sortedProducts = data?.data?.data;
    }
    setSortedProducts(sortedProducts);
  };
  useEffect(() => {
    console.log(page);
  });
  if (isLoading) return <Loader></Loader>;
  return (
    <>
      <ShopRoutesContainer notActive={routes}></ShopRoutesContainer>
      <div className="filterBar">
        <CategoryMenu></CategoryMenu>
        <Filter onFilter={handleFilter}></Filter>
      </div>
      <section className="productsContainer">
        {sortedProducts
          ? sortedProducts.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                onclick={handleCardClick}
                slug={product.documentId}
                img={product.url}
                name={product.name}
                price={product.price}
                sale={product.sale}
                salePrec={product.salePrecentage}
                rating={product.rating}
                category={product.categories[0].category}
                isNew={product.isNew}
              ></ProductCard>
            ))
          : data?.data?.data?.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                onclick={handleCardClick}
                slug={product.documentId}
                img={product.url}
                name={product.name}
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
      <div className="pagination">
        <div className="buttons">

        <button onClick={() => setPage(page - 1)} disabled={(page === 1)}>
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={
            page === Math.ceil(data?.data?.meta?.pagination?.total / limit)
          }
        >
          Next
        </button>
            </div>
        <p>current page :  {page}</p>
      </div>
    </>
  );
}
