import React, { useRef, useState } from "react";
import { cart } from "../../api/api";
import Loader from "../../components/loader/Loader";
import { useEffect } from "react";

import Addresses from "../../components/adresses/Addresses";
import ImgBanner from "../../components/imgBanner/ImgBanner";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { toast, Toaster } from "react-hot-toast";
import { AxiosConfig } from "../../axios/axiosConfig";
export default function CheckOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const [id, setId] = useState(localStorage.getItem("id"));
  const { data, isLoading } = cart(id);
  const [account, setAccount] = useState([]);
  const [subtotal, setSubtotal] = useState("");
  const [total, setTotal] = useState("");
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));

  const radio1 = useRef(
    <input type="radio" name="shipping" id="freeShipping" />
  );
  const radio2 = useRef(
    <input type="radio" name="shipping" id="localPickup" />
  );
  const radio3 = useRef(<input type="radio" name="shipping" id="flatrate" />);

  const products = [];
  const [onFocus, setOnFocus] = useState(radio1);
  const focused = (ref) => {
    setOnFocus(ref);
  };

  function loopingOnPrice() {
    let sum = 0;
    account?.user_carts?.forEach((product) => {
      if (product.publishedAt) {
        sum += product.totalPrice;
        products.push({
          name: product.name,
          price: product.totalPrice,
          quantity: product.quantity,
          productId: product.documentId,
        });
      }
    });
    setSubtotal(sum);
    settingTotalPrice();
  }

  function settingTotalPrice() {
    if (radio3 === onFocus) {
      setTotal(subtotal + 10);
    } else {
      setTotal(subtotal);
    }
  }
  const ordersMutation = useMutation({
    mutationKey: ["cart"],
    mutationFn: async () => {
      
      await AxiosConfig(`orders?populate=*`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        data: {
          data: {
          ...products,
          user_carts: [account.user_carts],
          users_permissions_users: [parseInt(id)],
          totalPrice: total,
          },
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      toast.success("order completed successfully");
      navigate("/")
    },
  });
  const deleteCart = useMutation({
    mutationKey: ["cart"],
    mutationFn: async () => {
      
      await AxiosConfig(`users/${id}?populate=*`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        data: {
          
            user_carts: []
          
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);   
    },
  });
  useEffect(() => {
    setAccount(data?.data);
    loopingOnPrice();
    console.log(products);
  });
  const submit = () => {
    if(account?.user_carts?.length < 1){

      toast.success("no items in the cart")
    } else{
      ordersMutation.mutate();
      deleteCart.mutate();
    }
  };
  if (isLoading) return <Loader></Loader>;
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
      <section className="checkout">
        <ImgBanner
          src={
            "https://depot.qodeinteractive.com/wp-content/uploads/2017/01/faq-title-img.jpg"
          }
          name={"Check Out"}
        ></ImgBanner>
        {
          account ? 
        account?.user_carts?.length > 0 ? (
          <>
            <Addresses></Addresses>
            <table>
              <tr>
                <th>Product</th>
                <th>SubTotal</th>
              </tr>
              {account?.user_carts
                ? account?.user_carts?.map((product) => (
                    <tr className={`${product.publishedAt ? "" : "hide"}`}>
                      <td>
                        {product.name} <span> x{product.quantity} </span>
                      </td>
                      <td>{product.totalPrice} $</td>
                    </tr>
                  ))
                : ""}

              <tr>
                <th>Subtotal</th>
                <td>{subtotal} $</td>
              </tr>
              <tr className="shippingRow">
                <th>Shipping</th>
                <td className="shipping">
                  <div className="input">
                    <input
                      type="radio"
                      onClick={() => focused(radio1)}
                      checked={onFocus == radio1 ? true : false}
                      name="shipping"
                      id="freeShipping"
                    />
                    <label htmlFor="freeShipping">free shipping</label>
                  </div>
                  <div className="input">
                    <input
                      type="radio"
                      onClick={() => focused(radio2)}
                      checked={onFocus == radio2 ? true : false}
                      name="shipping"
                      id="localPickup"
                    />
                    <label htmlFor="localPickup">local pickup</label>
                  </div>
                  <div className="input">
                    <input
                      type="radio"
                      onClick={() => focused(radio3)}
                      checked={onFocus == radio3 ? true : false}
                      name="shipping"
                      id="flaterate"
                    />
                    <label htmlFor="flatrate">flat rate : 10 $</label>
                  </div>
                </td>
              </tr>
              <tr>
                <th>Total</th>
                <td>{total} $</td>
              </tr>
              <tr className="textarea">
                <td>
                  <textarea placeholder="Write your notes"></textarea>
                </td>
              </tr>
              <tfoot>
                <tr>
                  <td>
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our privacy policy.{" "}
                  </td>
                  <td onClick={submit}>Place Order</td>
                </tr>
              </tfoot>
            </table>
          </>
        ) : (
          <div className={`noProducts`}>
          <h6>No Products Added</h6>
          <div>
            <NavLink to={"/shop"}>Redirect to shop</NavLink>
          </div>
        </div>
        ) : 
        <div className={`noAccount`}>
        <h6>Please LogIn fist</h6>
        <div>
          <NavLink to={"/login"}>Redirect to login</NavLink>
        </div>
      </div>
        }
      </section>
    </>
  );
}
