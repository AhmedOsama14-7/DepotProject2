import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AxiosConfig } from "../../axios/axiosConfig";
import { toast , Toaster} from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
export default function WishListCard({ name, price, img, id , publishedAt }) {
  const queryClient = useQueryClient();
  const [jwt , setJwt] = useState(localStorage.getItem("jwt"))
  const deleteProduct = useMutation({
    mutationKey: ["wish-list"],
    mutationFn: async (id) => {
      await AxiosConfig(`user-wish-lists/${id}?populate=*`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"])
      toast.success("removed from wish list")
    },
  }); 

  const onClick = () => {
    deleteProduct.mutate(id);
  };
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
            icon: "🖤",
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    <div className={`productCard ${publishedAt ? "" : "hide"}`}>
      <div className="left">
        <div className="xmark" onClick={onClick}>
          <FaXmark ></FaXmark>
        </div>
        <div className="img">
          <img src={img} alt={id} />
        </div>
      </div>

      <div className="right">
        <h6>{name}</h6>
        <p>{price} $</p>
        <button>Add to cart</button>
      </div>
    </div>
</>
  );
}
