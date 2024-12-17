import React, { useEffect } from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomePage from "../pages/homePage/HomePage";
import Shop from "../pages/shop/Shop";
import SingleProduct from "../pages/singleProduct/SingleProduct";
import ProductsContainer from "../components/productsContainer/ProductsContainer";
import LoginPage from "../pages/loginPage/LoginPage";
import Account from "../pages/account/Account";
import WishList from "../pages/wishList/WishList";
import Cart from "../pages/cart/Cart";
import CheckOut from "../pages/checkout/CheckOut";
import { useNewProductContext } from "../context/newProductContext";
import About from "../pages/about/About";
import NotFound from "../pages/notFound/NotFound";
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import AdminDashboardLogin from "../pages/adminDashboardLogin/AdminDashboardLogin";
import UsersDashboard from "../components/usersDashboard/UsersDashboard";
import ProductsDashboard from "../components/productsDashboard/ProductsDashboard";

 
    export const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        { index: true, element: <HomePage></HomePage> },
        {
          path: "/shop",
          element: <Shop></Shop>,
          children: [
            { index: true, element: <ProductsContainer></ProductsContainer> },
            {
              path: "singleProduct/:id",
              element: <SingleProduct></SingleProduct>,
            },
            { path: "/shop/wishlist", element: <WishList /> },
            {
              path: "/shop/newProducts",
              element: <ProductsContainer></ProductsContainer>,
            },
            {
              path: "/shop/onSale",
              element: <ProductsContainer></ProductsContainer>,
            },
          ],
        },
        { path: "/logIn", element: <LoginPage></LoginPage> },
        { path: "/account", element: <Account></Account> },
        { path: "/cart", element: <Cart /> },
        { path: "/Checkout", element: <CheckOut /> },
        { path: "/AboutUs", element: <About /> },
        { path: "/admin-dashboard-login", element: <AdminDashboardLogin />  },
        { path: "/admin-dashboard", element: <AdminDashboard /> , children :[
          {index:true, element: <UsersDashboard />},
          {path:"/admin-dashboard/admins" , element: <UsersDashboard />},
          {path:"/admin-dashboard/products" , element: <ProductsDashboard />},
          {path:"/admin-dashboard/newProducts" , element: <UsersDashboard />},
          {path:"/admin-dashboard/orders" , element: <UsersDashboard />},
        ]},
        { path: "*", element: <NotFound></NotFound> },
      ],
    },
  ]);

 
