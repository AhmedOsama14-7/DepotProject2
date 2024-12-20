import React, { useEffect, useState } from "react";
import { getNewProducts, getOrders, users } from "../../api/api";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { AxiosConfig } from "../../axios/axiosConfig";
import { Toaster, toast } from "react-hot-toast";
import { GrUserAdmin } from "react-icons/gr";
import Loader from "../loader/Loader";

export default function NewProductsDashboard() {
  const limit = 8;
  const [page, setPage] = useState(1);
  const [productsArr, setProductsArr] = useState([]);
  const { data, isLoading } = getNewProducts(page, limit);
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const queryClient = useQueryClient();
  const deleteProduct = useMutation({
    mutationKey: ["newProducts"],
    mutationFn: async (id) =>
      await AxiosConfig(`products/${id}?populate=*`, {
        method: "PUT",
        data:{
            data:{
               
                    isNew:false,
                    new_products: []
                
            }
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["newProducts"]);
      toast.success("product deleted");
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  const deleteClick = (id) => {
    deleteProduct.mutate(id);
  };

  useEffect(() => {
    setProductsArr(data?.data?.data);
    console.log(data?.data?.data);
  });

  if (isLoading) return <Loader></Loader>;
  return (
    <div className="newProductsDashboard">
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
            <th>Product</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {
                productsArr &&
                productsArr[0]?.products?.map((product) => (
                    <>
                    <tr>

                        <td>{product.name}</td>
                        <td>
                            <MdDelete onClick={() => deleteClick(product.documentId)} />
                        </td>
                    </tr>
                    </>
                ))
            }

            
        </tbody>
      </table>

      <div className="pagination">
        <div className="buttons">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
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
        <p>current page : {page}</p>
      </div>
    </div>
  );
}
