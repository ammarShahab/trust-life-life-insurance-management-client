import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaEye, FaFileDownload } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Loading from "../../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  heading: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12 },
});

// PolicyPDF uses @react-pdf/renderer primitives; provide safe fallbacks
const PolicyPDF = ({ policy = {} }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>Policy Document</Text>
      <Text style={styles.text}>Name: {policy.name ?? ""}</Text>
      <Text style={styles.text}>Email: {policy.email ?? ""}</Text>
      <Text style={styles.text}>Address: {policy.address ?? ""}</Text>
      <Text style={styles.text}>NID: {policy.nid ?? ""}</Text>
      <Text style={styles.text}>Policy Title: {policy.policyTitle ?? ""}</Text>
      <Text style={styles.text}>
        Policy ID: {policy.policyId ?? policy._id ?? ""}
      </Text>
      <Text style={styles.text}>Coverage: {policy.coverage ?? "N/A"}</Text>
      <Text style={styles.text}>
        Duration: {policy.duration ?? "N/A"} years
      </Text>
      <Text style={styles.text}>
        Monthly Premium: ${policy.estimatedPremiumMonthly ?? "0"}
      </Text>
      <Text style={styles.text}>
        Yearly Premium: ${policy.estimatedPremiumYearly ?? "0"}
      </Text>
      <Text style={styles.text}>Status: {policy.status ?? "N/A"}</Text>
    </Page>
  </Document>
);

const MyPolicies = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["my-applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-applications?email=${user.email}`);
      return res.data;
    },
  });

  const onReviewSubmit = async (data) => {
    const reviewData = {
      ...data,
      policyId: selectedPolicy.policyId,
      policyTitle: selectedPolicy.policyTitle,
      email: user.email,
      userName: user.displayName,
      userImage: user.photoURL,
      date: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/reviews", reviewData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Review submitted successfully!", "success");
        setIsReviewModalOpen(false);
        reset();
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  const getBadgeColor = (status) => {
    switch ((status ?? "").toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="px-2 py-8">
      <Helmet>
        <title>Trust Life | Dashboard My Policies</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800  dark:text-gray-300">
        My Applied Policies
      </h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto border border-gray-200 dark:border-0">
            <thead className="bg-gray-100 text-gray-700 dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300">
              <tr>
                <th className="p-3 text-left">Policy</th>
                <th className="p-3 text-left">Coverage</th>
                <th className="p-3 text-left">Duration</th>
                <th className="p-3 text-left">Premium</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    🚫 No policies found.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app._id}
                    className="border-t bg-white border-b hover:bg-gray-50 dark:bg-gray-400 dark:text-gray-300 dark:hover:bg-gray-500"
                  >
                    <td className="p-3">
                      <div className="font-semibold dark:text-gray-100">
                        {app.policyTitle}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-100">
                        Policy Id: {app.policyId}
                      </div>
                    </td>
                    <td className="p-3 dark:text-gray-100">
                      {app.coverage || "N/A"}
                    </td>
                    <td className="p-3 dark:text-gray-100">
                      {app.duration || "N/A"} Years
                    </td>
                    <td className="p-3 dark:text-gray-100">
                      ${app.estimatedPremiumMonthly ?? 0} /mo
                    </td>
                    <td className="p-3 dark:text-gray-100">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded ${getBadgeColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="p-3 flex flex-col sm:flex-row sm:mt-2 gap-2">
                      <button
                        onClick={() => {
                          setSelectedPolicy(app);
                          setIsReviewModalOpen(true);
                        }}
                        className="flex items-center gap-1 bg-[#693d3d] hover:bg-[#774545]  text-white px-3 py-1 rounded text-[10px]"
                      >
                        <FaStar /> Review
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPolicy(app);
                          setIsDetailModalOpen(true);
                        }}
                        className="flex items-center gap-1 bg-[#baa53a] hover:bg-[#fcd547] transition duration-200 text-white px-3 py-1 rounded text-[10px]"
                      >
                        <FaEye /> View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300 rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-lg font-bold mb-4">Write a Review</h3>
            <form onSubmit={handleSubmit(onReviewSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1">Rating (1–5 Stars)</label>
                <select
                  {...register("rating", { required: true })}
                  className="w-full border px-3 py-2 rounded dark:text-gray-900"
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option className="dark:text-gray-900" key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Feedback</label>
                <textarea
                  {...register("feedback", { required: true })}
                  className="w-full border px-3 py-2 rounded dark:text-gray-900"
                  rows={4}
                  placeholder="Share your thoughts..."
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2  bg-[#693d3d] hover:bg-[#774545] rounded text-white dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#baa53a] text-white rounded hover:bg-[#fcd547]"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isDetailModalOpen && selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300">
            <h3 className="text-xl font-semibold mb-4">Policy Details</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <strong>Policy Title:</strong> {selectedPolicy.policyTitle}
              </li>
              <li>
                <strong>Policy ID:</strong> {selectedPolicy.policyId}
              </li>
              <li>
                <strong>Coverage:</strong> {selectedPolicy.coverage}
              </li>
              <li>
                <strong>Duration:</strong> {selectedPolicy.duration} years
              </li>
              <li>
                <strong>Monthly Premium:</strong> $
                {selectedPolicy.estimatedPremiumMonthly}
              </li>
              <li>
                <strong>Yearly Premium:</strong> $
                {selectedPolicy.estimatedPremiumYearly}
              </li>
            </ul>

            <div className="flex justify-end gap-2 mt-4">
              {/* Only show download when approved */}
              {selectedPolicy.status === "approved" ? (
                <PDFDownloadLink
                  document={<PolicyPDF policy={selectedPolicy} />}
                  fileName={`Policy-${
                    selectedPolicy.policyId ?? selectedPolicy._id
                  }.pdf`}
                >
                  {({ blob, url, loading, error }) => {
                    if (error) {
                      console.error("PDF generation error:", error);
                      return (
                        <button
                          className="flex items-center gap-1 px-4 py-2 text-sm rounded bg-gray-300 text-gray-500"
                          disabled
                        >
                          <FaFileDownload />
                          Failed
                        </button>
                      );
                    }

                    return (
                      <a
                        href={url}
                        download={`Policy-${
                          selectedPolicy.policyId ?? selectedPolicy._id
                        }.pdf`}
                        className="flex items-center gap-1 px-4 py-2 text-sm rounded bg-[#baa53a] hover:bg-[#fcd547] text-white h-full"
                      >
                        <FaFileDownload />
                        {loading ? "Preparing…" : "Download Policy"}
                      </a>
                    );
                  }}
                </PDFDownloadLink>
              ) : (
                <button
                  className="flex items-center gap-1 px-4 py-2 text-sm rounded bg-gray-300 text-gray-500 cursor-not-allowed"
                  disabled
                >
                  <FaFileDownload />
                  Policy Not Approved
                </button>
              )}

              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2  rounded  bg-[#693d3d] hover:bg-[#774545] text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPolicies;
