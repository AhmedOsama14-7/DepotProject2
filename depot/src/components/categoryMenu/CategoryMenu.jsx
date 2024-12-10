import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import "animate.css";
import CategoryContext from "../../context/CategoryContext";
export default function CategoryMenu() {
  const All = useRef(<input type="button" value={"All"} />);
  const Accessories = useRef(<input type="button" value={"Accessories"} />);
  const Decoration = useRef(<input type="button" value={"decoration"} />);
  const hardWoods = useRef(<input type="button" value={"hardWoods"} />);
  const Fancies = useRef(<input type="button" value={"fancies"} />);
  const [activeCat, SetActiveCat] = useState(All);

  function pcCategoryBtnActive(ref) {
    SetActiveCat(ref);
  }
  const { handleCategoryChange } = useContext(CategoryContext);
  useEffect(() => {
    handleCategoryChange(activeCat);
  });

  const [isHover, setIsHover] = useState(false);
  const [MobileCategoryBtnClicked, setMobileCategoryBtnClicked] =
    useState(false);

  function mobileCatBtnClicked() {
    setMobileCategoryBtnClicked(!MobileCategoryBtnClicked);
  }
  const hover = {
    display: isHover ? "flex" : "none",
  };
  const catActive = {
    display: MobileCategoryBtnClicked ? "flex" : "none",
  };
  return (
    <>
      <div className="pcCat">
        <div className="categories">
          <button className="categoryBtn">
            Category
            <FaCaretDown />
          </button>
          <div className={`categoryUL`}>
            <input
              type="button"
              onClick={() => pcCategoryBtnActive(All)}
              className={activeCat == All ? "active" : ""}
              value="All"
            />
            <input
              type="button"
              onClick={() => pcCategoryBtnActive(Accessories)}
              className={activeCat == Accessories ? "active" : ""}
              value="Accessories"
            />
            <input
              type="button"
              onClick={() => pcCategoryBtnActive(Decoration)}
              className={activeCat == Decoration ? "active" : ""}
              value="decoration"
            />
            <input
              type="button"
              onClick={() => pcCategoryBtnActive(hardWoods)}
              className={activeCat == hardWoods ? "active" : ""}
              value="hardWoods"
            />
            <input
              type="button"
              onClick={() => pcCategoryBtnActive(Fancies)}
              className={activeCat == Fancies ? "active" : ""}
              value="fancies"
            />
          </div>
        </div>
      </div>

      <div className="mobileCat">
        <div className="categories">
          <button className="categoryBtn" onClick={mobileCatBtnClicked}>
            Category
            <FaCaretDown />
          </button>
          <div
            className={`categoryUL animate__animated animate__slideInDown animate__faster`}
            style={catActive}
          >
            <input
              type="button"
              onClick={() => pcCategoryBtnActive(All)}
              className={activeCat == All ? "active" : ""}
              value="All"
            />
            <input
              type="button"
              onClick={() => pcCategoryBtnActive(Accessories)}
              className={activeCat == Accessories ? "active" : ""}
              value="Accessories"
            />
            <input
              type="button"
              onClick={() => pcCategoryBtnActive(Decoration)}
              className={activeCat == Decoration ? "active" : ""}
              value="decoration"
            />
            <input
              type="button"
              onClick={() => pcCategoryBtnActive(hardWoods)}
              className={activeCat == hardWoods ? "active" : ""}
              value="hardWoods"
            />
            <input
              type="button"
              onClick={() => pcCategoryBtnActive(Fancies)}
              className={activeCat == Fancies ? "active" : ""}
              value="fancies"
            />
          </div>
        </div>
      </div>
    </>
  );
}
