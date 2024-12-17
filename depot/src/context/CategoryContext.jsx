import React, { createContext, useEffect, useState } from "react";
import { relatedProducts } from "../scripts/filter";
import { getRelatedProducts } from "../api/api";

const CategoryContext = createContext();
export const CategoryProvider = ({ children }) => {
  const [activeCategory, SetActiveCategory] = useState("All");
  const [categorySelected, SetCategorySelected] = useState(activeCategory);

  const handleCategoryChange = async (category) => {
    SetActiveCategory(category);
    SetCategorySelected(activeCategory.current.props.value);
  };

  return (
    <CategoryContext.Provider
      value={{ categorySelected , handleCategoryChange  }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
