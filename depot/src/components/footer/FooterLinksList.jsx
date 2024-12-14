import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
export default function FooterLinksList({
  header,
  list1,
  list2,
  list3,
  list4,
  link1,
  link2,
  link3,
  link4
}) {
  return (
    <div className="footerList">
      <h5 className="listHeader">{header}</h5>
      <ul className="footerUl">
        <li>
          <IoIosArrowRoundForward />
          <NavLink to={link1}>{list1}</NavLink>
        </li>
        <li>
          <IoIosArrowRoundForward />
          <NavLink to={link2}>{list2}</NavLink>
        </li>
        <li>
          <IoIosArrowRoundForward />
          <NavLink to={link3}>{list3}</NavLink>
        </li>
        <li>
          <IoIosArrowRoundForward />
          <NavLink to={link4}>{list4}</NavLink>
        </li>
      </ul>
    </div>
  );
}
