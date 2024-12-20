import { useEffect, useState } from "react";
import { RouterProvider, useLocation } from "react-router-dom";
import "./routes/Routes";
import { route } from "./routes/Routes";

import "./style/main.css";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { CategoryProvider } from "./context/CategoryContext";
import {
  NewProductsContext,
} from "./context/newProductContext";
import { OnSaleProductsContext } from "./context/onSaleContext";
import ScrollArrow from "./components/scrollArrow/ScrollArrow";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

// Add / Edit in products DashBoard
// Order page


  return (
    <>
      <NewProductsContext>
        <OnSaleProductsContext>
          <CategoryProvider>
            <QueryClientProvider client={queryClient}>
              <ScrollArrow></ScrollArrow>
              <RouterProvider router={route}></RouterProvider>
            </QueryClientProvider>
          </CategoryProvider>
        </OnSaleProductsContext>
      </NewProductsContext>
    </>
  );
}

export default App;
