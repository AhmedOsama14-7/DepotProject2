import React, { useEffect, useState } from "react";
import { users } from "../../api/api";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { AxiosConfig } from "../../axios/axiosConfig";
import { Toaster, toast } from "react-hot-toast";
import { GrUserAdmin } from "react-icons/gr";
import Loader from "../loader/Loader";
export default function UsersDashboard() {
  const limit = 8;
  const [page, setPage] = useState(1);
  const [usersArr, setUsersArr] = useState([]);
  const { data, isLoading } = users(limit, page);
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const queryClient = useQueryClient();
  const deleteUser = useMutation({
    mutationKey: ["users", "admins"],
    mutationFn: async (id) =>
      await AxiosConfig(`users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
      toast.success("user deleted");
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });
  const setAdmin = useMutation({
    mutationKey: ["users", "admins"],
    mutationFn: async (id) =>
      await AxiosConfig(`admins`, {
        method: "POST",
        data:{
          data:{
            users_permissions_users: parseFloat(id)
          }
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["admins" , "users"]);
      toast.success("user is set admin" , 
      {
        icon:"🔑"
      });
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  const deleteClick = (id) => {
    deleteUser.mutate(id);
  };
  const setAdminClick = (id) => {
    setAdmin.mutate(id)
  }
 
  useEffect(() => {
    setUsersArr(data?.data);
    console.log(data?.data);
  });

  if(isLoading) return <Loader></Loader>
  return (
    <div className="usersDashboard">
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
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>set Admin</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
           { usersArr.length > 0 &&
            usersArr?.map((user) => {
              return (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td><GrUserAdmin onClick={()=> setAdminClick(user.id) } /></td>
                  <td>
                    <MdDelete onClick={() => deleteClick(user.id)} />
                  </td>
                </tr>
              );
            }) }
        </tbody>
      </table>
    </div>
  );
}
