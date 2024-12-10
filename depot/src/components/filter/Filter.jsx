import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import "animate.css";

export default function Filter({ onFilter }) {
  const [isHover, setIsHover] = useState(false);
  const [filterBtnClicked, setFilterBtnClicked] = useState(false);

  function filterBtnIsClicked() {
    setFilterBtnClicked(!filterBtnClicked);
  }
  const hover = {
    display: isHover ? "flex" : "none",
  };

  const filterActive = {
    display: filterBtnClicked ? "flex" : "none",
  };
  return (
    <>
      <div
        className="filter"
        onMouseEnter={() => setIsHover(true)}
        onClick={filterBtnIsClicked}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="filterBtn">
          <p>Filter</p>
          <FaCaretDown />
        </div>

        <div
          className="filterContainer animate__animated animate__fadeIn animate__faster"
          style={filterActive}
        >
          <div className="sort">
            <h6>Sort by</h6>
            <ul>
              <li onClick={() => onFilter("")}>default</li>
              <li onClick={() => onFilter("rating")}>Average rating</li>
              <li onClick={() => onFilter("nameAsc")}>Name : A to Z</li>
              <li onClick={() => onFilter("nameDesc")}>Name : Z to A</li>
              <li onClick={() => onFilter("priceAsc")}>Price: Low to High</li>
              <li onClick={() => onFilter("priceDesc")}>Price: High to Low</li>
            </ul>
          </div>

          <div className="priceFilter">
            <h6>price range</h6>
            <ul>
              <li onClick={() => onFilter("")}>All</li>
              <li onClick={() => onFilter("to80")}>$0-$80</li>
              <li onClick={() => onFilter("to120")}>$80-$120</li>
              <li onClick={() => onFilter("to180")}>$120-$180</li>
              <li onClick={() => onFilter("to240")}>$180-$240</li>
              <li onClick={() => onFilter("above240")}>240$+</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
