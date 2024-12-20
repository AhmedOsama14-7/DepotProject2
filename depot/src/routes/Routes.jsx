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
import About from "../pages/about/About";
import NotFound from "../pages/notFound/NotFound";
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import UsersDashboard from "../components/usersDashboard/UsersDashboard";
import ProductsDashboard from "../components/productsDashboard/ProductsDashboard";
import ProductDashboardAdd from "../components/productDashboardAdd/ProductDashboardAdd";
import OrdersDashBoard from "../components/ordersDashboard/OrdersDashBoard";
import NewProductsDashboard from "../components/newProductsDashboard/NewProductsDashboard";
import UserAdminDashboard from "../components/user-adminDashboard/User-AdminDashboard";
import ProductDashboardEdit from "../components/productDashboardEdit/ProductDashboardEdit";


 
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
        { path: "/admin-dashboard", element: <AdminDashboard /> , children :[
          {index:true, element: <UsersDashboard />},
          {path:"/admin-dashboard/admins" , element: <UserAdminDashboard />},
          {path:"/admin-dashboard/products" , element: <ProductsDashboard /> , children:[
          ]},
          {path:"/admin-dashboard/products/addProduct" , element:<ProductDashboardAdd />},
          {path:"/admin-dashboard/products/editProduct/:id" , element:<ProductDashboardEdit />},
          {path:"/admin-dashboard/newProducts" , element: <NewProductsDashboard />},
          {path:"/admin-dashboard/orders" , element: <OrdersDashBoard />},
        ]},
        { path: "*", element: <NotFound></NotFound> },
      ],
    },
  ]);

 
