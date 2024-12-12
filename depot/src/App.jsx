import { useEffect, useState } from "react";
import { RouterProvider, useLocation } from "react-router-dom";
import "./routes/Routes";
import { route } from "./routes/Routes";

import "./style/main.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { CategoryProvider } from "./context/CategoryContext";
import {
  NewProductsContext,
  useNewProductContext,
} from "./context/newProductContext";
import { OnSaleProductsContext } from "./context/onSaleContext";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <>
      <NewProductsContext>
        <OnSaleProductsContext>
          <CategoryProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={route}></RouterProvider>
            </QueryClientProvider>
          </CategoryProvider>
        </OnSaleProductsContext>
      </NewProductsContext>
    </>
  );
}

export default App;
