import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth/useAuth";
import { Helmet } from "react-helmet-async";
import Loading from "../../../../../components/Loading/Loading";

const PolicyClearance = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: claims = [], isLoading } = useQuery({
    queryKey: ["claim-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/claim-requests?agentEmail=${user.email}`
      );
      return res.data;
    },
  });

  const approveClaimMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/claim-request/${id}`, {
        claim_status: "approved",
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Approved!", "Claim has been approved", "success");
      queryClient.invalidateQueries(["claim-requests"]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to approve claim", "error");
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Approve this claim?",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveClaimMutation.mutate(id);
      }
    });
  };

  const openModal = (policy) => {
    setSelectedPolicy(policy);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPolicy(null);
    setIsOpen(false);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-4">
      <Helmet>
        <title>Trust Life | Dashboard Policy Clearance</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800 dark:text-gray-300">
        Claim Requests
      </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : claims.length === 0 ? (
        <p className="text-center text-gray-600">
          No claim requests available.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm bg-white rounded-lg shadow-md border border-gray-200 dark:border-0">
            <thead className="bg-gray-100 text-gray-700  dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300">
              <tr>
                <th className="py-3 px-4 text-left">Customer Name</th>
                <th className="py-3 px-4 text-left">Policy Title</th>
                {/* <th className="py-3 px-4 text-left">Amount</th> */}
                <th className="py-3 px-4 text-left">Reason</th>
                {/* <th className="py-3 px-4 text-left">Document</th> */}
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((app) => (
                <tr
                  key={app._id}
                  className={`bg-white border-b hover:bg-gray-50 transition  dark:bg-gray-500 dark:text-gray-300 dark:hover:bg-gray-600`}
                >
                  <td className="py-3 px-4">{app.name}</td>
                  <td className="py-3 px-4">{app.policyTitle}</td>
                  {/* <td className="py-3 px-4">${app.amount || "N/A"}</td> */}
                  <td className="py-3 px-4 max-w-xs truncate">
                    {app.claim_reason}
                  </td>
                  <td className="py-3 px-4">
                    {/*   <a
                      className="text-blue-600 underline hover:text-blue-800"
                      href={app.claim_document}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a> */}
                    <td className="py-3 px-4 space-x-2">
                      {/* <button
                        onClick={() => openModal(app.policyInfo)}
                        className="px-3 py-1 rounded bg-blue-500 text-white text-xs hover:bg-blue-600 transition"
                      >
                        View Details
                      </button> */}
                      <button
                        onClick={() => handleApprove(app._id)}
                        className="px-3 py-1 rounded bg-green-600 text-white text-xs hover:bg-green-700 transition"
                      >
                        Approve
                      </button>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal remains unchanged */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-bold mb-2 text-green-700">
              Policy Details
            </Dialog.Title>
            {selectedPolicy ? (
              <div className="space-y-2 text-sm text-gray-700">
                <img
                  src={selectedPolicy.image}
                  alt={selectedPolicy.title}
                  className="rounded-lg w-full h-40 object-cover"
                />
                <h3 className="font-semibold text-lg">
                  {selectedPolicy.title}
                </h3>
                <p>{selectedPolicy.description}</p>
                <p>
                  <strong>Coverage:</strong> {selectedPolicy.coverage}
                </p>
                <p>
                  <strong>Duration:</strong> {selectedPolicy.duration}
                </p>
                <p>
                  <strong>Premium:</strong> {selectedPolicy.premium}
                </p>
              </div>
            ) : (
              <p>No policy data found.</p>
            )}
            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-sm"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default PolicyClearance;
