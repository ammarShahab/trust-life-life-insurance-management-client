import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Loading from "../../../../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/customers");
      return res.data;
    },
  });

  const promoteMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/customers/${id}/promote`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Success", "User promoted to agent", "success");
    },
  });

  const demoteMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/customers/${id}/demote`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Success", "User demoted to customer", "success");
    },
  });

  /*   const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/customers/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Deleted", "User has been deleted", "success");
    },
  }); */

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete feature is coming soon",
      text: "This will permanently delete the user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      /* if (result.isConfirmed) {
        deleteMutation.mutate(id);
      } */
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Helmet>
        <title>Trust Life | Dashboard Manage Users</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800 dark:text-gray-300">
        Manage Users
      </h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto border border-gray-300 dark:border-0 text-sm">
            <thead className="bg-gray-100 dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Registration Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b hover:bg-gray-50  dark:bg-gray-500 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  <td className="p-3 font-medium">{user.customerName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">{user.registrationDate}</td>
                  <td className="p-3 flex gap-2 justify-center flex-wrap">
                    {user.role === "customer" ? (
                      <button
                        onClick={() => promoteMutation.mutate(user._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
                      >
                        Promote to Agent
                      </button>
                    ) : (
                      <button
                        onClick={() => demoteMutation.mutate(user._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Demote to Customer
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="w-full xl:w-auto  bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
