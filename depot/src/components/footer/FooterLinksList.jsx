import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
export default function FooterLinksList({
  header,
  list1,
  list2,
  list3,
  list4,
}) {

  
  return (
    <div className="footerList">
      <h5 className="listHeader">{header}</h5>
      <ul className="footerUl">
        <li>
          <IoIosArrowRoundForward  />
          <NavLink to={"/"}>{list1}</NavLink>
        </li>
        <li>
          <IoIosArrowRoundForward   />
          <NavLink to={"/"}>{list2}</NavLink>
        </li>
        <li>
          <IoIosArrowRoundForward />
          <NavLink to={"/"}>{list3}</NavLink>
        </li>
        <li>
          <IoIosArrowRoundForward />
          <NavLink to={"/"}>{list4}</NavLink>
        </li>
      </ul>
    </div>
  );
}
