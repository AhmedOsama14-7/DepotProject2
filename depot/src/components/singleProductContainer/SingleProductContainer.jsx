import React from 'react'
import SingleProductContent from '../singleProductContent/SingleProductContent'

export default function SingleProductContainer({ product }) {

  return (
  <section>
    <SingleProductContent product={product}></SingleProductContent>
  </section>
  )
}
