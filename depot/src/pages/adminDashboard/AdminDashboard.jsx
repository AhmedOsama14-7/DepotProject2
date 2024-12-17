import React, { useEffect, useState } from "react";

import { redirect, useNavigate } from "react-router-dom";
import { admin } from "../../api/api";
import Dashboard from "../../components/dashboard/Dashboard";

export default function AdminDashboard() {
  const [id, setId] = useState(localStorage.getItem("id"));
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [admins, setAdmins] = useState([]);
  const { data, isLoading } = admin();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  function checkIfAdmin() {
    admins?.data?.[0]?.users_permissions_users?.map((admin) => {
      if (parseInt(id) === admin.id) {
        setIsAdmin(true);
      } else {
        navigate("/");
      }
    });
  }

  useEffect(() => {
    setAdmins(data?.data);
    checkIfAdmin();
  });

  return (
    <section className="dashboardPage">
      <Dashboard isAdmin={isAdmin}></Dashboard>
    </section>
  );
}
