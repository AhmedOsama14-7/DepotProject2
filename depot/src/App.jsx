import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import "./routes/Routes"
import {routes} from './routes/Routes'
import'./style/main.css'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { CategoryProvider } from './context/CategoryContext'
function App() {
  
  const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
          refetchOnWindowFocus:false
      }
  }
});

// 1 - Filter and sort
// 2 - Validation And Login

  return (
    <>
      <CategoryProvider>
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={routes}></RouterProvider>
      
    </QueryClientProvider>  
      </CategoryProvider>
    
     
    </>
  )
}

export default App
