import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { getProducts } from '../../api/api';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useMutation, useQueryClient } from 'react-query';
import { AxiosConfig } from '../../axios/axiosConfig';
import Loader from '../loader/Loader';
import ProductDashboardEdit from '../productDashboardEdit/ProductDashboardEdit';
import { NavLink } from 'react-router-dom';
export default function ProductsDashboard() {
  const limit = 8
  const [ page , setPage] = useState(1)
  const [products , setProducts] = useState([])
  const {data , isLoading} = getProducts(page , limit)
  const [jwt , setJwt]= useState(localStorage.getItem("jwt"))
  const queryClient = useQueryClient()
  const [activeEditWindow , setActiveEditWindow] = useState(false)
  const [chosenProduct , setChosenProduct] = useState()
  
  const deleteProduct = useMutation({
    mutationKey: [ "products" , page],
    mutationFn: async (id) =>
      await AxiosConfig(`products/${id}?populate=*`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products" , page]);
      toast.success("product deleted");
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  const deleteClick = (id) =>{
    deleteProduct.mutate(id)
  }
  const openEditWindow = (product) => {
    setActiveEditWindow(true)
    setChosenProduct(product)
  }
  useEffect(() => {
    setProducts(data?.data?.data)
  })
  if(isLoading) return <Loader></Loader>
  return (
    <div className="productsDashboard">
      <Toaster
        toastOptions={{
          style: {
            color: "red",
          },

          success: {
            style: {
              color: "black",
            },
            icon: "❌",
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>price</th>
            <th>Before Sale</th>
            <th>Sale prec</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data &&
            products?.map((product) => {
              return (
                <tr>
                  <td>{product.documentId}</td>
                  <td>{product.name}</td>
                  <td>{product.price} $</td>
                  <td>{product.sale ? product.sale + "$" : "none"}</td>
                  <td>
                    {product.salePrecentage ? product.salePrecentage + "%": "none"}
                  </td>
                  <td>
                    <NavLink to={`/admin-dashboard/products/editProduct/${product.documentId}`}>

                    <MdEdit />
                    </NavLink>
                    <MdDelete onClick={() => deleteClick(product.documentId)}></MdDelete>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="pagination">
        <div className="buttons">

        <button onClick={() => setPage(page - 1)} disabled={(page === 1)}>
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={
            page === Math.ceil(data?.data?.meta?.pagination?.total / limit)
          }
        >
          Next
        </button>
            </div>
        <p>current page :  {page}</p>
      </div>
      {
        chosenProduct &&
        <ProductDashboardEdit isActive={activeEditWindow} setActive={setActiveEditWindow} product={chosenProduct}></ProductDashboardEdit>
      }
    </div>
  )
}
