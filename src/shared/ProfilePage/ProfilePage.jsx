import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";
import toast from "react-hot-toast";
import { FaUserEdit, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import useCustomerRole from "../../hooks/useCustomerRole";
import Loading from "../../components/Loading/Loading";

const ProfilePage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { role } = useCustomerRole();
  const [showEdit, setShowEdit] = useState(false);

  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  // Fetch current user info
  const { data: customerData = {}, isLoading } = useQuery({
    queryKey: ["customerProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/customers/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Update mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.put(
        `/customers/${user?.email}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["customerProfile", user?.email]);
      setShowEdit(false);
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  // populate form when data arrives
  useEffect(() => {
    reset({
      customerName: customerData?.customerName || user?.displayName || "",
      photoURL: customerData?.photoURL || user?.photoURL || "",
    });
  }, [customerData, user, reset]);

  // Role Badge Colors
  const roleBadgeColor = {
    customer: "bg-blue-100 text-blue-800",
    agent: "bg-green-100 text-green-800",
    admin: "bg-purple-100 text-purple-800",
  };

  // Static contact details (change these to dynamic fields if you store them)
  const phoneNumber = customerData?.phone || "+880123456789"; // fallback static
  const address = customerData?.address || "Dhaka, Bangladesh"; // fallback static

  const onSubmit = (data) => {
    const updatedProfile = {
      email: user?.email,
      customerName: data.customerName,
      photoURL: data.photoURL,
    };
    updateProfileMutation.mutate(updatedProfile);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Profile Card */}
        <aside className="w-full md:w-1/3 bg-white dark:bg-gray-700 rounded-lg p-5 flex flex-col items-center text-center shadow-sm">
          <div className="w-36 h-36 rounded-full overflow-hidden mb-4 border-4 border-gray-200 dark:border-gray-600">
            <img
              src={
                customerData?.photoURL ||
                user?.photoURL ||
                "https://i.ibb.co/6D5Vf2L/default-avatar.png"
              }
              alt={customerData?.customerName || user?.displayName || "profile"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://i.ibb.co/6D5Vf2L/default-avatar.png";
              }}
            />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {customerData?.customerName || user?.displayName || "No Name"}
          </h3>

          <div
            className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
              roleBadgeColor[customerData?.role] || "bg-gray-200 text-gray-800"
            }`}
          >
            {customerData?.role
              ? customerData.role.toUpperCase()
              : role?.toUpperCase() || "UNKNOWN"}
          </div>

          <div className="mt-4 w-full text-left">
            <p className="text-xs text-gray-500 dark:text-gray-300">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Email:
              </span>
              <br />
              <span className="text-sm">
                {customerData?.email || user?.email}
              </span>
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-300 mt-3">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Last Login:
              </span>
              <br />
              <span className="text-sm">
                {customerData?.lastSignInTime ||
                  user?.metadata?.lastSignInTime ||
                  "N/A"}
              </span>
            </p>

            <div className="flex items-center gap-2 mt-3 text-sm text-gray-700 dark:text-gray-200">
              <FaPhoneAlt />
              <span>{phoneNumber}</span>
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-700 dark:text-gray-200">
              <FaMapMarkerAlt />
              <span>{address}</span>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Registered: {customerData?.registrationDate || "N/A"}
            </p>
          </div>

          {/*  <button
            onClick={() => setShowEdit((s) => !s)}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#baa53a] hover:bg-[#f0c83b] text-white font-medium"
          >
            <FaUserEdit /> {showEdit ? "Close" : "Edit Profile"}
          </button> */}
        </aside>

        {/* Right: Edit Form / Info Panel */}
        <section className="w-full md:w-2/3 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Profile Details
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-300">
              You can update display name & photo here
            </p>
          </div>

          {!showEdit && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 font-bold">
                  Name
                </label>
                <div className="mt-1 text-gray-800 dark:text-gray-100">
                  {customerData?.customerName || user?.displayName || "-"}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 font-bold">
                  Profile Photo
                </label>
                <div className="mt-1 break-words text-sm text-gray-700 dark:text-gray-200">
                  {customerData?.photoURL || user?.photoURL || "-"}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 font-bold">
                  Role
                </label>
                <div className="mt-1 text-gray-800 dark:text-gray-100">
                  {customerData?.role || role || "-"}
                </div>
              </div>

              <div className="text-right">
                <button
                  onClick={() => setShowEdit(true)}
                  className="px-4 py-2 rounded-md bg-[#baa53a] hover:bg-[#f0c83b] text-white"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}

          {showEdit && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  {...register("customerName")}
                  className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Photo URL
                </label>
                <input
                  type="text"
                  {...register("photoURL")}
                  className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm p-2"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEdit(false)}
                  className="px-4 py-2 rounded-md bg-[#693d3d] hover:bg-[#774545] text-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || updateProfileMutation.isLoading}
                  className="px-4 py-2 rounded-md bg-[#baa53a] hover:bg-[#f0c83b] text-white font-medium"
                >
                  {isSubmitting || updateProfileMutation.isLoading
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
