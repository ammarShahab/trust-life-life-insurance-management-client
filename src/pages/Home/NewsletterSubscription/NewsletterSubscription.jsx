import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import subscribeBanner2 from "../../../assets/images/subscribe_banner2.png";
import useAxios from "../../../hooks/useAxios";

const NewsletterSubscription = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(`/newsletter-subscription`, data);
      if (res.data?.insertedId) {
        toast.success("Subscribed successfully!");
        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("Subscription failed!");
    }
  };

  return (
    // <section className="  p-10 relative bg-[conic-gradient(at_left,_#f5eee6,_#fff8e3,_#f3d7ca)]">
    <section className="p-10 relative bg-[conic-gradient(at_top_right,_#f9f3df,_#fdfce5,_#d7e9f7)] dark:bg-none dark:bg-gray-900 ">
      <div className=" max-w-7xl mx-auto flex sm:flex-row flex-col justify-center items-center gap-7 sm:gap-24 mt-10 mb-12">
        <div className="w-1/2">
          <img
            src={subscribeBanner2}
            alt="Newsletter Visual"
            className="w-full"
          />
        </div>
        <div className="space-y-6 text-center sm:text-left">
          <h1
            style={{
              backgroundImage:
                "linear-gradient(90deg,rgba(112, 215, 120, 1) 0%, rgba(198, 168, 78, 1) 82%, rgba(116, 181, 241, 1) 100%)",
            }}
            className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text dark:text-gray-300"
          >
            Join Our Newsletter
          </h1>
          <p className="text-slate-500 dark:text-gray-300">
            Join now — get an exclusive guide to choosing the right policy.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter Name"
              className="h-14 w-full px-4 rounded-lg border border-gray-300 focus:outline-none"
            />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter Email"
              className="h-14 w-full px-4 rounded-lg border border-gray-300 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full sm:w-40 px-6 py-3 bg-[#baa53a] hover:bg-[#fcd547] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
