import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../../hooks/useAxios";
import Loading from "../../../../../components/Loading/Loading";

const PolicyQuotePage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { policyId } = useParams();
  const axiosInstance = useAxios();

  const [result, setResult] = useState(null);

  const { data: policy, isLoading } = useQuery({
    queryKey: ["policy", policyId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/policies/${policyId}`);
      return res.data;
    },
  });

  const onSubmit = (data) => {
    const age = parseInt(data.age);
    const coverage = parseInt(data.coverage);
    const duration = parseInt(data.duration);
    const isSmoker = data.smoker === "yes";
    const gender = data.gender;

    let rate = 0.05;

    if (isSmoker) rate += 0.03;
    if (age > 40) rate += 0.005;
    if (age > 60) rate += 0.01;
    if (duration > 20) rate += 0.01;
    if (gender === "female") rate -= 0.01;

    const monthly = ((coverage / 10000) * rate).toFixed(2) * 100;
    const yearly = (monthly * 12).toFixed(2);

    setResult({ monthly, yearly, coverage, duration });
  };

  const handleApplyClick = () => {
    if (!result || !policy) return;

    navigate(`/apply-policy/${policyId}`, {
      state: {
        estimatedPremiumMonthly: result.monthly,
        estimatedPremiumYearly: result.yearly,
        coverage: result.coverage,
        duration: result.duration,
        title: policy.title || "Unknown",
        category: policy.category || "Unknown",
      },
    });
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded shadow mt-10 dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300"
      >
        <h2 className="text-2xl font-bold text-center mb-6 ">
          Get a Quote for "{policy.title}"
        </h2>
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            {...register("age", { required: true })}
            className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-gray-300"
            placeholder="e.g. 35"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select
            {...register("gender")}
            className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-gray-300"
          >
            <option className="dark:text-gray-300" value="male">
              Male
            </option>
            <option className="dark:text-gray-300" value="female">
              Female
            </option>
            <option className="dark:text-gray-300" value="other">
              Other
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium dark:text-gray-300">
            Coverage Amount (৳)
          </label>
          <input
            type="number"
            {...register("coverage", { required: true })}
            className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-gray-300"
            placeholder="e.g. 2000000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Duration (years)</label>
          <input
            type="number"
            {...register("duration", { required: true })}
            className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-gray-300"
            placeholder="e.g. 20"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Smoker?</label>
          <select
            {...register("smoker")}
            className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-gray-300"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#baa53a] hover:bg-[#fcd547] text-white py-2 rounded font-medium"
        >
          Calculate Premium
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50 text-center dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300 dark:border-0">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Estimated Premium
          </p>
          <p className="text-gray-800 mt-1 dark:text-gray-300">
            Monthly: ৳{result.monthly}
          </p>
          <p className="text-gray-800 dark:text-gray-300">
            Yearly: ৳{result.yearly}
          </p>

          <button
            onClick={handleApplyClick}
            className="mt-4 bg-[#baa53a] hover:bg-[#fcd547] transition text-white px-5 py-2 rounded"
          >
            Apply for Policy
          </button>
        </div>
      )}
    </div>
  );
};

export default PolicyQuotePage;
