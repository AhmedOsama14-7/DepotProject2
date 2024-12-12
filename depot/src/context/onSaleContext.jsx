import React, { createContext, useContext, useEffect, useState } from "react";


const OnSaleContext = createContext();

export const useOnSaleContext = () => {
   return useContext(OnSaleContext)
};
export const OnSaleProductsContext = ({ children }) => {
    const [isOnSale, setIsOnSale] = useState(false);
    useEffect(() => {
      if (window.location.pathname === '/shop/onSale' ) {
        setIsOnSale(true);
      } else {
        setIsOnSale(false);
      }
    }, [window.location.pathname, setIsOnSale]);
    

  return (
    <OnSaleContext.Provider
      value={{ isOnSale, setIsOnSale }}
    >
      {children}
    </OnSaleContext.Provider>
  );
};