import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

import { IoIosArrowUp } from "react-icons/io";
export default function Layout() {
  return (
    <Fragment>
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>

        <div className="topArrow">
          <IoIosArrowUp />
        </div>
      </main>
      <Footer></Footer>
    </Fragment>
  );
}
