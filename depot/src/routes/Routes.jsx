import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/homePage/HomePage';
import Shop from '../pages/shop/Shop';
import SingleProduct from '../pages/singleProduct/SingleProduct';
import ProductsContainer from '../components/productsContainer/ProductsContainer';
import LoginPage from '../pages/loginPage/LoginPage';
import Account from '../pages/account/Account';

    export const routes = createBrowserRouter([
        {
            path:"/" , element:<Layout></Layout> , children:[
                {index:true , element:<HomePage></HomePage>},
                {path:"/shop" , element:<Shop></Shop> , children:[
                    {index:true , element:<ProductsContainer ></ProductsContainer> },
                    {path:"singleProduct/:id" , element: <SingleProduct></SingleProduct>}
                ]},
                {path:"/logIn" , element: <LoginPage></LoginPage>},
                {path:"/account" , element: <Account></Account>}
                
            ]
        }


]);




