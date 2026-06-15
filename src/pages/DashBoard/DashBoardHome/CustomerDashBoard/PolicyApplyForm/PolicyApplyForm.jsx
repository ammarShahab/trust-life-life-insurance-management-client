import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth/useAuth";

const PolicyApplyForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { policyId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const applicationData = {
      name: user?.displayName || "Unknown",
      email: user?.email || "Unknown",
      address: data.address,
      nid: data.nid,
      nomineeName: data.nomineeName,
      nomineeRelationship: data.nomineeRelationship,
      healthConditions: data.healthConditions || [],
      policyId,
      policyTitle: state?.title || "Unknown",
      policyCategory: state?.category || "Unknown",
      estimatedPremiumMonthly: state?.estimatedPremiumMonthly || "N/A",
      estimatedPremiumYearly: state?.estimatedPremiumYearly || "N/A",
      coverage: state?.coverage,
      duration: state?.duration,
      appliedDate: new Date().toISOString(),
      status: "pending",
    };

    // console.log(applicationData);

    try {
      const res = await axiosSecure.post(
        "/policy-applications",
        applicationData
      );
      if (res.data.insertedId) {
        Swal.fire("Success", "Application submitted successfully!", "success");
        reset();
        navigate("/dashboard/payment-status");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "You already applied for this policy.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300 mt-26 rounded mb-10 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Policy Application Form
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className=" p-6 space-y-4">
        {/* Prefilled Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border px-3 py-2 rounded dark:bg-gray-600"
          />
        </div>

        {/* Prefilled Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border px-3 py-2 rounded  dark:bg-gray-600 dark:text-gray-300"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            {...register("address", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your address"
          />
        </div>

        {/* NID Number */}
        <div>
          <label className="block mb-1 font-medium">NID Number</label>
          <input
            {...register("nid", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your NID number"
          />
        </div>

        {/* Nominee Name */}
        <div>
          <label className="block mb-1 font-medium">Nominee Name</label>
          <input
            {...register("nomineeName", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter nominee's name"
          />
        </div>

        {/* Nominee Relationship */}
        <div>
          <label className="block mb-1 font-medium">Nominee Relationship</label>
          <input
            {...register("nomineeRelationship", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Father, Mother, Spouse"
          />
        </div>

        {/* Health Disclosure */}
        <div>
          <label className="block mb-2 font-medium">Health Conditions</label>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <label>
              <input
                type="checkbox"
                value="Diabetes"
                {...register("healthConditions")}
              />{" "}
              Diabetes
            </label>
            <label>
              <input
                type="checkbox"
                value="High Blood Pressure"
                {...register("healthConditions")}
              />{" "}
              High Blood Pressure
            </label>
            <label>
              <input
                type="checkbox"
                value="Heart Disease"
                {...register("healthConditions")}
              />{" "}
              Heart Disease
            </label>
            <label>
              <input
                type="checkbox"
                value="None"
                {...register("healthConditions")}
              />{" "}
              None
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#baa53a] hover:bg-[#fcd547] text-white py-2 rounded font-semibold"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default PolicyApplyForm;
