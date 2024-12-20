import React, { useEffect, useState } from "react";
import { getOrders, users } from "../../api/api";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { AxiosConfig } from "../../axios/axiosConfig";
import { Toaster, toast } from "react-hot-toast";
import { GrUserAdmin } from "react-icons/gr";
import Loader from "../loader/Loader";

export default function OrdersDashBoard() {
    const limit = 8;
    const [page, setPage] = useState(1);
    const [ordersArr, setOrdersArr] = useState([]);
    const {data , isLoading} = getOrders(page , limit)
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const queryClient = useQueryClient();
    const deleteOrder = useMutation({
      mutationKey: ["users", "admins"],
      mutationFn: async (id) =>
        await AxiosConfig(`orders/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }),
      onSuccess: () => {
        queryClient.invalidateQueries(["orders"]);
        toast.success("order deleted");
      },
      onError: () => {
        toast.error("something went wrong");
      },
    });
    
  
    const deleteClick = (id) => {
      deleteOrder.mutate(id);
    };
   
   
    useEffect(() => {
      setOrdersArr(data?.data?.data)
      console.log(data?.data?.data[0]?.users_permissions_users[0]?.username);
    });
  
    if(isLoading) return <Loader></Loader>
    return (
      <div className="ordersDashboard">
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
              <th>User</th>
              <th>Total Price</th>
              <th>adress</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {ordersArr &&
              ordersArr?.map((order , index) => {
                return (
                  <tr>
                   
                    <td className="products">
                        {
                            ordersArr[index]?.user_carts?.map((product) => (
                                <td>{product.name} x {product.quantity} || {product.price} $</td>
                            ))
                        }
                    </td>
                    <td>{order?.users_permissions_users[0]?.username}</td>
                    <td>{order.totalPrice} $</td>
                    <td className="address">
                        <td>
                        {order?.users_permissions_users[0]?.country}
                        </td>
                        <td>
                        {order?.users_permissions_users[0]?.state}
                        </td>
                        <td>
                        {order?.users_permissions_users[0]?.town}
                        </td>
                        <td>
                        {order?.users_permissions_users[0]?.streetAddress}
                        </td>
                        <td>
                        {order?.users_permissions_users[0]?.apartemntAddress}
                        </td>
                        </td>
                    <td>
                      <MdDelete onClick={() => deleteClick(order.documentId)} />
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
      </div>
      
    );
  }
  
