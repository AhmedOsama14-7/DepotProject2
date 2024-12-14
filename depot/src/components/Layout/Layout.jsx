import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

import { IoIosArrowUp } from "react-icons/io";
import ScrollArrow from "../scrollArrow/ScrollArrow";
export default function Layout() {
  return (
    <Fragment>
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>

      </main>
      <Footer></Footer>
    </Fragment>
  );
}
