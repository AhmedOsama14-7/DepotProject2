import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaXmark, FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { useMutation , useQueryClient } from "react-query";
import { AxiosConfig } from "../../axios/axiosConfig";

export default function CartCard({ img, id, price, name, publishedAt , quantity , totalPrice }) {
  const [counter, SetCounter] = useState(quantity);
  const [ overallPrice , setOverallPrice ] = useState(totalPrice)
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const minError = () => toast.error("Cannot Choose Less than 1");
  const maxError = () => toast.error("Cannot Choose more than 10");
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["cart"],
    mutationFn: async (id) => {
      await AxiosConfig(`user-carts/${id}?populate=*`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }); 
    },onSuccess: () => {
      queryClient.invalidateQueries(["cart"])
      toast.success("removed from cart")
    },
  });

  const deleteProduct = () => {
    deleteMutation.mutate(id)
  }
  const increamentMutation = useMutation(
    {
      mutationKey:["cart"],
      mutationFn: async () => {
        await AxiosConfig(`user-carts/${id}?populate=*` , {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          data:{
            data:{
              quantity: counter + 1,
              totalPrice: (counter + 1) * price,
            }
          }
        })
      }
      ,onSuccess: () => {
        queryClient.invalidateQueries("cart")
        
      },
    }
  )
  const decreamentMutation = useMutation(
    {
      mutationKey:["cart"],
      mutationFn: async () => {
        await AxiosConfig(`user-carts/${id}?populate=*` , {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          data:{
            data:{
              quantity: counter - 1,
              totalPrice: (counter - 1) * price,
            }
          }
        })
      }
      ,onSuccess: () => {
        queryClient.invalidateQueries("cart")
        
      },
    }
  )
  function incremnt() {
    if (counter < 10) {
      SetCounter(counter + 1)
      increamentMutation.mutate()
     
      
    } else {
      SetCounter(counter);
      maxError();
    }
  }

  function decremnt() {
    if (counter > 1) {
      SetCounter(counter - 1);
      decreamentMutation.mutate()
    } else {
      SetCounter(counter);
      minError();
    }
  }

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            color: "red",
          },

          success: {
            style: {
              color: "black",
            },
            icon: "🛒",
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div className={`productCard ${publishedAt ? "" : "hide"}`}>
        <div className="left">
          <div className="xmark" onClick={deleteProduct}>
            <FaXmark></FaXmark>
          </div>
          <div className="img">
            <img src={img} alt={id} />
          </div>
        </div>

        <div className="right">
          <h6>{name}</h6>
          <p>{price} $</p>
          <div className="quantity">
            <div>
              <p>Quantity</p>
            </div>
            <div className="quantityCounter">
              <FaCaretLeft onClick={decremnt} />
              <p>{quantity}</p>
              <FaCaretRight onClick={incremnt} />
            </div>
          </div>
          <p>{totalPrice}$</p>
        </div>
      </div>
    </>
  );
}
