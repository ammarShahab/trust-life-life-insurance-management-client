import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loading from "../../../../../components/Loading/Loading";

const ClaimFormPage = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { applicationId } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [uploadedDoc, setUploadedDoc] = useState("");

  const {
    isLoading,
    isPending,
    data: application = {},
  } = useQuery({
    queryKey: ["application", applicationId],
    enabled: !!applicationId,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/policy-applications/${applicationId}`
      );
      return res.data;
    },
  });

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_UPLOAD_KEY
    }`;
    const res = await axios.post(imageUploadURL, formData);
    // console.log("Uploaded image url", res.data.data.url);
    setUploadedDoc(res.data.data.url);
  };

  const onSubmit = async (data) => {
    // console.log(data);

    // console.log(data.claim_reason, uploadedDoc);

    const claimRes = await axiosSecure.patch(
      `/claim-request/${applicationId}`,
      {
        claim_reason: data.claim_reason,
        claim_document: uploadedDoc,
        claim_status: "claimed",
      }
    );

    // console.log(claimRes.data);
    if (claimRes.data.modifiedCount) {
      Swal.fire(
        "Claim Submitted!",
        "Your claim request has been submitted.",
        "success"
      );

      reset();
      navigate("/dashboard/claim-request");
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 ">
      <h2 className="text-3xl font-bold mb-8 text-green-800 dark:text-gray-300 text-center text-primary">
        Submit Claim Request
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-xl shadow-lg dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500"
      >
        {/* Policy Title */}
        <div>
          <h3 className="text-lg font-semibold mb-2 dark:text-gray-300">
            Policy Title
          </h3>
          <input
            type="text"
            id="policyTitle"
            value={application?.policyTitle || ""}
            readOnly
            className="w-full border border-gray-300 p-3 rounded-md bg-gray-100 text-gray-700"
          />
        </div>

        {/* Reason for Claim */}
        <div>
          <h3 className="text-lg font-semibold mb-2 dark:text-gray-300">
            Reason for Claim
          </h3>
          <textarea
            id="claim_reason"
            rows={5}
            placeholder="Write your reason here..."
            {...register("claim_reason", { required: true })}
            className="w-full border border-gray-300 p-3 rounded-md "
          />
        </div>

        {/* File Upload */}
        <div>
          <h3 className="text-lg font-semibold mb-2 dark:text-gray-300">
            Upload Supporting Document (PDF/Image)
          </h3>

          <input
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 dark:text-gray-400 focus:outline-none dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isPending}
            className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#baa53a] hover:bg-[#fcd547] text-white "
            }`}
          >
            {isPending ? "Submitting..." : "Submit Claim"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClaimFormPage;
