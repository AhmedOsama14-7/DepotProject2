import React from 'react'
import ShopRoutesContainer from '../../components/shopRoutesConatiner/ShopRoutesContainer'
import FilterByCategory from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import ProductsContainer from '../../components/productsContainer/ProductsContainer'
import { Outlet } from 'react-router-dom'

export default function Shop() {

  return (
   <>
        <Outlet></Outlet>
   </>
  )
}
