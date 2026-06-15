import { useQuery } from "@tanstack/react-query";

import Loading from "../../../../../components/Loading/Loading";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ManageTransactions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/transactions");
      return res.data;
    },
  });

  const totalIncome = payments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="px-4 md:px-8 py-6 space-y-6">
      <Helmet>
        <title>Trust Life | Dashboard Manage Transaction</title>
      </Helmet>
      {/* Title */}
      <h2 className="text-2xl font-bold text-green-800 dark:text-gray-300">
        Manage Transactions
      </h2>

      {/* Filter Options */}
      {/* <div className="flex flex-wrap gap-4">
        <select className="px-3 py-2 border rounded-md">
          <option value="">Filter by Date Range</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
        </select>
        <select className="px-3 py-2 border rounded-md">
          <option value="">Filter by User</option>
          <option value="customer1@customer.com">customer1@customer.com</option>
          <option value="customer2@customer.com">customer2@customer.com</option>
        </select>
        <select className="px-3 py-2 border rounded-md">
          <option value="">Filter by Policy</option>
          <option value="Health Assurance Plus">Health Assurance Plus</option>
          <option value="Senior Life Secure">Senior Life Secure</option>
        </select>
      </div> */}

      {/* Total Income Card */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 dark:border-0 max-w-sm  dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300">
        <h4 className="text-lg font-semibold mb-1">Total Income</h4>
        <p className="text-2xl font-bold text-green-600 dark:text-gray-300">
          ৳{totalIncome}
        </p>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 dark:border-0">
        <table className="min-w-full text-sm text-left text-gray-600 ">
          <thead className="text-xs uppercase bg-gray-100 text-gray-700  dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-2 py-3">
                Policy Name
              </th>
              <th scope="col" className="px-2 py-3">
                Customer Email
              </th>
              <th scope="col" className="px-2 py-3">
                Transaction ID
              </th>
              <th scope="col" className="px-2 py-3">
                Amount
              </th>
              <th scope="col" className="px-2 py-3">
                Date
              </th>
              <th scope="col" className="px-2 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr
                  key={payment._id}
                  className={`bg-white border-b hover:bg-gray-50  dark:bg-gray-500 dark:text-gray-300 dark:hover:bg-gray-600 `}
                >
                  <td className="px-2 py-4">{payment.policyTitle}</td>
                  <td className="px-2 py-4">{payment.email}</td>
                  <td className="px-2 py-4 font-mono">
                    {payment.transactionId}
                  </td>
                  <td className="px-2 py-4 font-semibold text-green-600 dark:text-gray-300">
                    ৳{payment.amount}
                  </td>
                  <td className="px-2 py-4">
                    {new Date(payment.paymentTime).toLocaleString("en-BD", {
                      timeZone: "Asia/Dhaka",
                    })}
                  </td>
                  <td className="px-2 py-4">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        payment.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.status === "paid" ? "Success" : "Failed"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 italic bg-white"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTransactions;
