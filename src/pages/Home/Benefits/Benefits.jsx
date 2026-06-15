import {
  FaCalculator,
  FaHeadset,
  FaLaptopCode,
  FaLock,
  FaChartLine,
  FaUserCircle,
} from "react-icons/fa";

const features = [
  {
    title: "Instant Quote Calculation",
    description:
      "Generate precise quotes instantly with our streamlined calculator, saving you time and effort.",
    icon: <FaCalculator className="text-4xl text-green-800 dark:text-white" />,
    gradient: "from-[#8dd95d] to-green-400 ",
  },
  {
    title: "Expert Agent Support",
    description:
      "Connect with our expert agents anytime for personalized guidance and support.",
    icon: <FaHeadset className="text-4xl text-blue-800 dark:text-white" />,
    gradient: "from-[#93c8ed] to-blue-400",
  },
  {
    title: "100% Online Application",
    description:
      "Apply entirely online with a simple, paperless process designed for convenience.",
    icon: <FaLaptopCode className="text-4xl text-yellow-700 dark:text-white" />,
    gradient: "from-[#b9a447] to-yellow-400",
  },
  {
    title: "Secure Online Payments",
    description:
      "Pay securely with our encrypted online payment system, ensuring your data is protected.",
    icon: <FaLock className="text-4xl text-green-900 dark:text-white" />,
    gradient: "from-[#8cda5d] to-green-500",
  },
  {
    title: "Real-Time Claim Tracking",
    description:
      "Track your claims in real-time with clear, up-to-date progress reports.",
    icon: <FaChartLine className="text-4xl text-blue-900 dark:text-white" />,
    gradient: "from-[#93c8ed] to-blue-500",
  },
  {
    title: "Personalized Dashboard Access",
    description:
      "Manage your account and preferences through a tailored, user-friendly dashboard.",
    icon: <FaUserCircle className="text-4xl text-yellow-800 dark:text-white" />,
    gradient: "from-[#b9a447] to-yellow-500 ",
  },
];

const Benefits = () => {
  return (
    <section className=" py-16 px-4 mx-auto bg-[conic-gradient(at_top_right,_#f9f3df,_#fdfce5,_#d7e9f7)] dark:bg-none dark:bg-gray-900">
      <div className="mx-auto text-center mb-12 mt-10">
        <h2
          className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text py-2 dark:text-gray-300"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(112, 215, 120, 1) 0%, rgba(198, 168, 78, 1) 82%, rgba(116, 181, 241, 1) 100%)",
          }}
        >
          Benefits of Trust Life
        </h2>
        <p className="mt-3 text-slate-500 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
          Discover how Trust Life simplifies your insurance journey — from
          instant quotes to real-time claim tracking and more.
        </p>
      </div>

      <div className="max-w-7xl px-2 mx-auto grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${feature.gradient} rounded-lg shadow-lg p-4 transition-transform hover:scale-[1.02] duration-300 text-center dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500`}
          >
            <div className="flex flex-col justify-center items-center  gap-2 mb-4">
              <p className="dark:text-white">{feature.icon}</p>
              <h3 className="text-lg font-bold bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                {feature.title}
              </h3>
            </div>
            <p className="text-sm text-white">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
