import React, { useEffect, useRef, useState } from "react";
import CartCard from "../../components/cartCard/CartCard";
import ImgBanner from "../../components/imgBanner/ImgBanner";
import { cart } from "../../api/api";
import { NavLink } from "react-router-dom";
import Loader from "../../components/loader/Loader";

export default function Cart() {
  const [country, setCountry] = useState("egypt");
  const [subtotal, setSubtotal] = useState("");
  const [total, setTotal] = useState("");
  const [id, setId] = useState(localStorage.getItem("id"));
  const radio1 = useRef(
    <input type="radio" name="shipping" id="freeShipping" />
  );
  const radio2 = useRef(
    <input type="radio" name="shipping" id="localPickup" />
  );
  const radio3 = useRef(<input type="radio" name="shipping" id="flatrate" />);
  const [onFocus, setOnFocus] = useState(radio1);

  const [cartItems, setCartItems] = useState([]);
  const { data, isLoading } = cart(id);
  const focused = (ref) => {
    setOnFocus(ref);
  };

  function loopingPrice() {
    let sum = 0;

    cartItems?.user_carts?.forEach((product) => {
      if (product.publishedAt) {
        sum += product.totalPrice;
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



  useEffect(() => {
    setCartItems(data?.data);
    loopingPrice();
  });

  if (isLoading) return <Loader></Loader>;
  return (
    <>
      <section className="cartPage">
        <ImgBanner
          src={
            "https://depot.qodeinteractive.com/wp-content/uploads/2017/01/faq-title-img.jpg"
          }
          name={"your cart"}
        ></ImgBanner>
        <div className="cartSection">
          <div className="productsContainer">
            <h4>shopping Cart</h4>

            <div className="products">
              {cartItems ? (
                cartItems.user_carts?.length >= 1 ? (
                  cartItems?.user_carts?.map((product) => (
                    <CartCard
                      publishedAt={product.publishedAt}
                      img={product.url}
                      id={product.documentId}
                      name={product.name}
                      price={product.price}
                      quantity={product.quantity}
                      totalPrice={product.totalPrice}
                    ></CartCard>
                  ))
                ) : (
                  <div className={`noProducts`}>
                    <h6>No Products Added</h6>
                    <div>
                      <NavLink to={"/shop"}>Redirect to shop</NavLink>
                    </div>
                  </div>
                )
              ) : (
                <>
                  <div className={`noAccount`}>
                    <h6>Please LogIn fist</h6>
                    <div>
                      <NavLink to={"/login"}>Redirect to login</NavLink>
                    </div>
                  </div>
                </>
              )}
              
            </div>
          </div>
          <div
            className={`pricingBox ${
              cartItems?.user_carts?.length < 1 ? "hide" : ""
            } ${cartItems ? "" : "hide"}`}
          >
            <div className="header">
              <h6>cart total</h6>
            </div>

            <div className="orderPrice">
              <div className="subTotal">
                <p>subtotal:</p>
                <p>{subtotal} $</p>
              </div>

              <div className="shipping">
                <p>shipping</p>

                <div className="radio">
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

                  <p>
                    shipping to <span>{country}</span>{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="footer">
              <div className="price">
                <p>total</p>
                <p>{total} $</p>
              </div>

              <NavLink to="/Checkout">
                Proceed to Check Out
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
