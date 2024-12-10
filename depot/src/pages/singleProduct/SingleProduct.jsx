import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleproduct } from "../../api/api";
import SingleProductContainer from "../../components/singleProductContainer/SingleProductContainer";
import ShopRoutesContainer from "../../components/shopRoutesConatiner/ShopRoutesContainer";
import Loader from "../../components/loader/Loader";
export default function SingleProduct() {
  const { id } = useParams();
  const [product, SetProduct] = useState(null);

  const { data, isLoading } = getSingleproduct(id);

  if (isLoading) return <Loader />;

  return (
    <>
      <ShopRoutesContainer
        productId={data?.data?.data.documentId}
        productName={data?.data?.data.name}
      ></ShopRoutesContainer>
      <section className="singleProductPage">
        {data && (
          <SingleProductContainer product={data?.data}></SingleProductContainer>
        )}
      </section>
    </>
  );
}
