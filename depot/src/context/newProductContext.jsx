import React, { createContext, useContext, useEffect, useState } from "react";


const NewProductContext = createContext();

export const useNewProductContext = () => {
   return useContext(NewProductContext)
};
export const NewProductsContext = ({ children }) => {
    const [isNewProductPage, setIsNewProductPage] = useState(false);
    useEffect(() => {
      if (window.location.pathname === '/shop/newProducts' ) {
        setIsNewProductPage(true);
      } else {
        setIsNewProductPage(false);
      }
    }, [window.location.pathname, setIsNewProductPage]);
    

  return (
    <NewProductContext.Provider
      value={{ isNewProductPage, setIsNewProductPage }}
    >
      {children}
    </NewProductContext.Provider>
  );
};
