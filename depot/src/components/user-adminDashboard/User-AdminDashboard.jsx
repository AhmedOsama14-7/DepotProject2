import React, { useEffect, useState } from "react";
import { getAdmins, getNewProducts, getOrders, users } from "../../api/api";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { AxiosConfig } from "../../axios/axiosConfig";
import { Toaster, toast } from "react-hot-toast";
import { GrUserAdmin } from "react-icons/gr";
import Loader from "../loader/Loader";

export default function UserAdminDashboard() {
  const limit = 8;
  const [page, setPage] = useState(1);
  const [adminsArr, setAdminsArr] = useState([]);
  const { data, isLoading } = getAdmins(page, limit);
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const queryClient = useQueryClient();
  const removeAdmin = useMutation({
    mutationKey: ["newProducts"],
    mutationFn: async (id) =>
      await AxiosConfig(`admins/${id}?populate=*`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
      toast.success("Admin removed");
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  const deleteClick = (id) => {
    removeAdmin.mutate(id);
  };

  useEffect(() => {
    setAdminsArr(data?.data?.data);
    console.log(data?.data);
  });

  if (isLoading) return <Loader></Loader>;
  return (
    <div className="user-AdminDashboard">
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
            <th>User</th>
            <th>Email</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
            {
                adminsArr &&
                adminsArr?.map((user) => (
                    <>
                    <tr>

                        <td>{user?.users_permissions_users[0]?.username}</td>
                        <td>{user?.users_permissions_users[0]?.email}</td>
                        <td>
                            <MdDelete onClick={() => deleteClick(user.documentId)} />
                        </td>
                    </tr>
                    </>
                ))
            }

            
        </tbody>
      </table>

      <div className="pagination">
        <div className="buttons">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
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
        <p>current page : {page}</p>
      </div>
    </div>
  );
}
