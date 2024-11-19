import React, { useEffect, useState } from 'react'
import {getProducts, getRelatedProducts} from "../../api/api"
import ProductCard from '../productCard/ProductCard'
import QuickLook from '../quickLook/QuickLook'
export default function RelatedProdcutsContainer({product}) {
    
    const [selectedCategory , setSelectedCategory ] = useState(product?.data?.categories[0]?.documentId) 
    const {data , isFetching } = getRelatedProducts(selectedCategory)
    const [products , setProducts] = useState([])   
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [active, SetActive] = useState(false);


    const handleCardClick = (product) => {
        SetActive(true);
        setSelectedProduct(product);
      };
    useEffect(()=> {
       setProducts(data?.data?.data?.products)
    },)
   
  return (
    <div className='relatedProducts'>
        <h6>Related Products</h6>
     <div className="productsContainer">

       { products?.map((product) => (
           <ProductCard
        product={product}
        key={product.id}
        slug={product.documentId}
        img={product.url}
        name={product.name}
        price={product.price}
        sale={product.sale}
        salePrec={product.salePrecentage}
        rating={product.rating}
        onclick={handleCardClick}
        isNew={product.isNew}
      ></ProductCard>
      )
      
      )} 

        {selectedProduct && (
          <QuickLook
            product={selectedProduct}
            active={active}
            SetActive={SetActive}
          ></QuickLook>
        )}
      </div>
    </div>
  )
}