import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();
  const loggingOut = () => {
    localStorage.clear("jwt");
    localStorage.clear("name");
    localStorage.clear("email");
    navigate("/");
  };
  return (
    <div className="logOut">
      <h6>Are You sure , You want to log out ?</h6>
      <input type="button" onClick={loggingOut} value={"Log Out"}></input>
    </div>
  );
}
