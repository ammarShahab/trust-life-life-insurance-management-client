import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Loading from "../../../../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const PaymentStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [paymentModes, setPaymentModes] = useState({});

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["payment-status", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-applications?email=${user.email}`);
      return res.data;
    },
  });

  const getBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const handlePayment = (app) => {
    const id = app._id;
    const mode = paymentModes[id] || app.paymentDuration || "monthly";
    const premium =
      mode === "yearly"
        ? app.estimatedPremiumYearly
        : app.estimatedPremiumMonthly;

    navigate(`/dashboard/payment-form/${id}`, {
      state: {
        applicationId: id,
        policyTitle: app.policyTitle,
        policyId: app.policyId,
        paymentDuration: mode,
        premium,
        customerEmail: app.email,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Helmet>
        <title>Trust Life | Dashboard Payment Status</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800 dark:text-gray-300">
        Payment Status
      </h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto dark:border-0 border border-gray-200 text-sm ">
            <thead className="bg-gray-100 text-gray-700 dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500">
              <tr className="dark:text-gray-300">
                <th className="p-3 text-left">Policy</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    🚫 No Payment Status Found.
                  </td>
                </tr>
              ) : (
                 applications.map((app) => {
                    const id = app._id;
                    const mode = paymentModes[id] || app.paymentDuration || "monthly";
                    const premium =
                      mode === "yearly"
                        ? app.estimatedPremiumYearly
                        : app.estimatedPremiumMonthly;

                   return (
                     <tr
                       key={id}
                       className="bg-white border-b  hover:bg-gray-50 dark:bg-gray-500 dark:text-gray-300 dark:hover:bg-gray-600"
                     >
                       <td className="p-3">
                         <div className="font-semibold text-gray-800 dark:text-gray-300">
                           {app.policyTitle}
                         </div>
                         <div className="text-xs text-gray-500 dark:text-gray-300">
                           ID: {app.policyId}
                         </div>
                       </td>
                       <td className="p-3 text-gray-700 dark:text-gray-300">
                         {app.policyCategory}
                       </td>
                       <td className="p-3 w-32">
                         <select
                           disabled={app.status !== "pending"}
                           className={`border rounded py-1 text-[12px] w-full sm:w-auto transition-colors dark:text-gray-900 ${
                             app.status !== "pending"
                               ? "bg-gray-100 text-gray-500  cursor-not-allowed"
                               : ""
                           }`}
                           value={mode}
                           onChange={(e) =>
                             setPaymentModes({
                               ...paymentModes,
                               [id]: e.target.value,
                             })
                           }
                         >
                           <option value="monthly">Monthly</option>
                           <option value="yearly">Yearly</option>
                         </select>
                       </td>
                       <td className="p-3 text-gray-800 dark:text-gray-300">
                         ৳{premium}
                       </td>
                       <td className="p-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded ${getBadgeColor(
                            app.status === "pending" ? "due" : "paid",
                          )}`}
                        >
                          {app.status === "pending" ? "Due" : "Paid"}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handlePayment(app)}
                          disabled={app.status !== "pending"}
                          className={`px-4 py-2 rounded text-sm text-white transition ${
                            app.status !== "pending"
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-yellow-500 hover:bg-yellow-600"
                          }`}
                        >
                          Make Payment
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;
