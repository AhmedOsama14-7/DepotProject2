import React from "react";
import FooterLinksList from "./FooterLinksList";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="menuContainer">
        <FooterLinksList
          header={"Customer Service"}
          list1={"contact us"}
          list2={"what we do"}
          list3={"online stores"}
          list4={"Terms & conditions"}
          link1={"/"}
          link2={"/"}
          link3={"/"}
          link4={"/"}
        ></FooterLinksList>
        <FooterLinksList
          header={"Shop"}
          list1={"Favourites"}
          list4={"On Sale"}
          list3={"New Products"}
          list2={"your cart"}
          link1={"/shop/wishList"}
          link2={"/cart"}
          link3={"/"}
          link4={"/"}
        ></FooterLinksList>
        <FooterLinksList
          header={"social media"}
          list1={"Facebook"}
          list2={"instagram"}
          list3={"Git Hub"}
          list4={"Linked In"}
          link1={"/"}
          link2={"/"}
          link3={"/"}
          link4={"/"}
        ></FooterLinksList>
        <FooterLinksList
          header={"Profile"}
          list1={"My Account"}
          list2={"Checkout"}
          list3={"order tracking"}
          list4={"Help & support"}
          link1={"/account"}
          link2={"/"}
          link3={"/"}
          link4={"/"}
        ></FooterLinksList>
      </div>

      <div className="testimoniel">
        <div className="copyRights">
          <p> &copy; 2021 Ahmed Osama , all rights reserved</p>
        </div>

        <div className="socialMedia">
          <p>Follow Us</p>
          <NavLink to={"/"}>
            <FaLinkedin />
          </NavLink>

          <NavLink to={"/"}>
            <FaGithub />
          </NavLink>

          <NavLink to={"/"}>
            <FaInstagram />
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
