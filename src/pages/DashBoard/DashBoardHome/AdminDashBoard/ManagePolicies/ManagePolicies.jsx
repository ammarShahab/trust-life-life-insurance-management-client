import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const ManagePolicies = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const {
    data: policies = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["policies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/policies");
      return res.data;
    },
  });

  const updatePolicy = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(
        `/policies/${editingPolicy._id}`,
        data
      );
      return res.data; // Make sure this includes `modifiedCount`
    },
    onSuccess: (result) => {
      // console.log(result);
      // queryClient.invalidateQueries({ queryKey: ["policies"] });
      if (result.modifiedCount > 0) {
        refetch();
        setShowModal(false);
        Swal.fire("Success", "Policy updated successfully", "success");
        reset();
      } else {
        Swal.fire("No Change", "No fields were modified.", "info");
      }
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong while updating.", "error");
    },
  });

  const handleDelete = (id, title) => {
    // console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/policies/${id}`)
          .then((res) => {
            // console.log(res.data);

            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Policy has been deleted.", "success");
              refetch();
            } else {
              Swal.fire("Failed", "Policy could not be deleted.", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error", "Something went wrong.", "error");
          });
      }
    });
  };

  const openAddModal = () => {
    setEditingPolicy(null);
    reset({
      title: "",
      category: "",
      description: "",
      minAge: "",
      maxAge: "",
      coverage: "",
      duration: "",
      premium: "",
      premiumDisplay: "",
      image: "",
    });
    setShowModal(true);
  };

  const openEditModal = (policy) => {
    setEditingPolicy(policy);
    reset(policy);
    setShowModal(true);
  };

  const handleAddPolicy = async (data) => {
    const newPolicy = {
      title: data.title,
      category: data.category,
      description: data.description,
      minAge: Number(data.minAge),
      maxAge: Number(data.maxAge),
      coverage: data.coverage,
      duration: data.duration,
      premium: Number(data.premium),
      premiumDisplay: data.premiumDisplay,
      image: data.image,
      purchasedCount: parseInt(0),
    };
    // console.log(newPolicy);
    // console.log(data);

    try {
      await axiosSecure.post("/policies", newPolicy).then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          refetch();
          reset();
          setShowModal(false);
          Swal.fire("Success", "New policy added successfully", "success");
        }
      });
    } catch (error) {
      console.error("Add policy error:", error);
      Swal.fire("Error", "Failed to add new policy", "error");
    }
  };

  const onSubmit = (data) => {
    const normalized = {
      ...data,
      premium: Number(data.premium),
      minAge: Number(data.minAge),
      maxAge: Number(data.maxAge),
    };
    editingPolicy ? updatePolicy.mutate(normalized) : handleAddPolicy(normalized);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Helmet>
        <title>Trust Life | Dashboard Manage Policies</title>
      </Helmet>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-800 dark:text-white">
          Manage Policies
        </h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#baa53a] hover:bg-[#fcd547]  text-white px-5 py-2 rounded-md shadow"
        >
          <FaPlus /> Add New Policy
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table-auto w-full text-left border border-gray-200 dark:border-0">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800  dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300 ">
            <tr>
              <th className="px-4 py-3">Policy Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Age Range</th>
              <th className="px-4 py-3">Coverage</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No policies found.
                </td>
              </tr>
            ) : (
              policies.map((policy) => (
                <tr
                  key={policy._id}
                  className="bg-white border-b hover:bg-gray-50  dark:bg-gray-500 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-2 font-medium">{policy.title}</td>
                  <td className="px-4 py-2">{policy.category}</td>
                  <td className="px-4 py-2">
                    {policy.minAge} - {policy.maxAge} years
                  </td>
                  <td className="px-4 py-2">{policy.coverage}</td>
                  <td className="px-4 py-2 flex gap-3">
                    <button
                      onClick={() => openEditModal(policy)}
                      className="text-blue-600 hover:text-blue-800 text-lg dark:text-gray-300"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(policy._id, policy.title)}
                      className="text-red-600 hover:text-red-800 text-lg"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4 ">
          <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]  dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300">
            <h2 className="text-xl text-center font-semibold mb-4">
              {editingPolicy ? "Edit Policy" : "Add New Policy"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Policy Title</label>
                <input
                  placeholder="Enter policy title"
                  {...register("title")}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <input
                  placeholder="Enter category"
                  {...register("category")}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  placeholder="Enter description"
                  {...register("description")}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 dark:text-gray-600"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="block mb-1 font-medium">Min Age</label>
                  <input
                    type="number"
                    placeholder="Minimum age"
                    {...register("minAge")}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 dark:text-gray-600"
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-1 font-medium">Max Age</label>
                  <input
                    type="number"
                    placeholder="Maximum age"
                    {...register("maxAge")}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 dark:text-gray-600"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Coverage Range</label>
                <input
                  placeholder="e.g. ৳10,000 - ৳100,000"
                  {...register("coverage")}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Duration Options
                </label>
                <input
                  placeholder="e.g. 10, 20, 30 years"
                  {...register("duration")}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Base Premium Amount
                </label>
                <input
                  type="number"
                  placeholder="e.g. 400"
                  {...register("premium")}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Premium Display Text
                </label>
                <input
                  placeholder="e.g. ৳400/month"
                  {...register("premiumDisplay")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Policy Image URL
                </label>
                <input
                  placeholder="Enter image URL"
                  {...register("image")}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    reset();
                  }}
                  className="px-5 py-2 rounded-md font-medium text-white bg-[#693d3d] hover:bg-[#774545] transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md font-medium text-white bg-[#baa53a] hover:bg-[#fcd547] transition duration-200"
                >
                  {editingPolicy ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePolicies;
