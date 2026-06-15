import React, { useState } from "react";
import { useForm } from "react-hook-form";

const GetFreeQuote = () => {
  const { register, handleSubmit } = useForm();
  const [premium, setPremium] = useState(null);

  const calculatePremium = (data) => {
    const age = parseInt(data.age);
    const duration = parseInt(data.duration);
    const coverage = parseInt(data.coverage);
    const isSmoker = data.smoker === "yes";
    const gender = data.gender;

    // Base rate factors
    let rate = 0.05;

    if (isSmoker) rate += 0.03;
    if (age > 40) rate += 0.005;
    if (age > 60) rate += 0.01;
    if (duration > 20) rate += 0.01;
    if (gender === "female") rate -= 0.01;

    const monthlyPremium = ((coverage / 10000) * rate).toFixed(2) * 100;
    const annualPremium = (monthlyPremium * 12).toFixed(2);

    setPremium({
      monthly: monthlyPremium,
      annual: annualPremium,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-10 mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Get a Free Quote
        </h2>

        <form onSubmit={handleSubmit(calculatePremium)} className="space-y-5">
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Age
            </label>
            <input
              type="number"
              {...register("age", { required: true })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="Your age"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Gender
            </label>
            <select
              {...register("gender")}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Coverage Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Coverage Amount (৳)
            </label>
            <select
              {...register("coverage")}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select amount</option>
              <option value="1000000">৳10,00,000</option>
              <option value="2000000">৳20,00,000</option>
              <option value="3000000">৳30,00,000</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Duration (Years)
            </label>
            <select
              {...register("duration")}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select duration</option>
              <option value="10">10 Years</option>
              <option value="15">15 Years</option>
              <option value="20">20 Years</option>
              <option value="25">25 Years</option>
              <option value="30">30 Years</option>
            </select>
          </div>

          {/* Smoker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Are you a smoker?
            </label>
            <select
              {...register("smoker")}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select option</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#baa53a] hover:bg-[#fcd547] text-white font-semibold py-2.5 rounded transition text-sm sm:text-base"
          >
            Calculate Premium
          </button>
        </form>

        {premium && (
          <div className="mt-6 bg-blue-50 dark:bg-gray-700 p-4 rounded-lg text-center text-gray-800 dark:text-white">
            <p className="text-lg font-semibold mb-2">
              Your Estimated Premium:
            </p>
            <p className="text-green-600 dark:text-green-400 text-base">
              ৳{premium.monthly}/month or ৳{premium.annual}/year
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetFreeQuote;
