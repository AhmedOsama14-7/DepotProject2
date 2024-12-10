import React, { useRef, useState } from "react";

import AccountDetails from "../../components/accountDetails/AccountDetails";
import LogOut from "../../components/logOut/LogOut";
import Addresses from "../../components/adresses/Addresses";
import ImgBanner from "../../components/imgBanner/ImgBanner";

export default function Account() {
  const accountDetails = useRef(
    <input type="button" value="Account details" />
  );
  const orders = useRef(<input type="button" value="Orders" />);
  const adresses = useRef(<input type="button" value="Addresses" />);
  const logOut = useRef(<input type="button" value="Log out" />);

  const [name, setName] = useState(localStorage.getItem("name"));
  const [active, setActive] = useState(accountDetails);
  function setingActiveButton(ref) {
    setActive(ref);
  }
  return (
    <>
      <ImgBanner src={"https://depot.qodeinteractive.com/wp-content/uploads/2017/01/faq-title-img.jpg"} name={"Account"}></ImgBanner>
      <div className="account">
        <div className="sideMenu">
          <div className="header">
            <div className="img">
              <img
                src="https://secure.gravatar.com/avatar/e74fed9b5380db3a6534bb5f25ea20c3?s=96&d=mm&r=g"
                alt="account.png"
              />
            </div>
            <div className="userName">
              <h4>Hello !</h4>
              <h6>@ {name}</h6>
            </div>
          </div>

          <div className="menuList">
            <input
              type="button"
              className={active == accountDetails ? "active" : ""}
              value="Account details"
              onClick={() => setingActiveButton(accountDetails)}
            />
            <input
              type="button"
              className={active == orders ? "active" : ""}
              value="Orders"
              onClick={() => setingActiveButton(orders)}
            />
            <input
              type="button"
              className={active == adresses ? "active" : ""}
              value="Addresses"
              onClick={() => setingActiveButton(adresses)}
            />
            <input
              type="button"
              className={active == logOut ? "active" : ""}
              value="Log out"
              onClick={() => setingActiveButton(logOut)}
            />
          </div>
        </div>

        <div className="openedWindow">
          {active == accountDetails ? (
            <AccountDetails />
          ) : active == orders ? (
            "orders"
          ) : active == adresses ? (
            <Addresses />
          ) : active == logOut ? (
            <LogOut></LogOut>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
