import React from 'react'
import SingleProductContent from '../singleProductContent/SingleProductContent'
import RelatedProdcutsContainer from '../relatedProductsContainer/RelatedProdcutsContainer'

export default function SingleProductContainer({ product }) {

  return (
  <section>
    <SingleProductContent product={product}></SingleProductContent>
    <RelatedProdcutsContainer product={product}></RelatedProdcutsContainer>
  </section>
  )
}
