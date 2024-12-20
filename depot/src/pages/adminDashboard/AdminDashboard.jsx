import React, { useEffect, useState } from "react";

import { redirect, useNavigate } from "react-router-dom";
import { admin } from "../../api/api";
import Dashboard from "../../components/dashboard/Dashboard";
import Loader from "../../components/loader/Loader";

export default function AdminDashboard() {
  const [id, setId] = useState(localStorage.getItem("id"));
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [admins, setAdmins] = useState([]);
  const { data, isLoading } = admin();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(true);
  function checkIfAdmin () {
    admins?.map((admin) => {
      if (parseInt(id) !== admin?.users_permissions_users[0].id) {
        setIsAdmin(false);
      } 
      
    });
    navigateToHome()
  }
  function navigateToHome () {
    if(!isAdmin){
      navigate("/")
    }
  }

  useEffect(() => {
    setAdmins(data?.data?.data);
    console.log(isAdmin);

    checkIfAdmin()
  });

  if (isLoading) return <Loader></Loader>;
  return (
    <section className="dashboardPage">
      <Dashboard isAdmin={isAdmin}></Dashboard>
    </section>
  );
}
