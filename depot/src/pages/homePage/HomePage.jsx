import React from "react";
import PaginationContainer from "../../components/paginationContainer/PaginationContainer";
import ProductsContainer from "../../components/productsContainer/ProductsContainer";
import WelcomeMess from "../../components/welcomeMess/WelcomeMess";
import SponsorShipBar from "../../components/sponserShipBar/SponsorShipBar";

export default function HomePage() {
  return (
    <>
      <PaginationContainer></PaginationContainer>
      <SponsorShipBar></SponsorShipBar>
      <WelcomeMess></WelcomeMess>
      <ProductsContainer routes={true}></ProductsContainer>
    </>
  );
}
