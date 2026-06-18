import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading/Loading";
import { IoMdMail } from "react-icons/io";

const MeetOurAgent = () => {
  const axiosInstance = useAxios();

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["limited-agents"],
    queryFn: async () => {
      const res = await axiosInstance.get("/limited-agents");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="relative w-full py-20 sm:py-28 overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a]">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200/60 dark:via-slate-700/40 to-transparent" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-200/20 dark:bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-teal-200/20 dark:bg-teal-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <h2
            style={{
              backgroundImage:
                "linear-gradient(90deg,rgba(112, 215, 120, 1) 0%, rgba(198, 168, 78, 1) 82%, rgba(116, 181, 241, 1) 100%)",
            }}
            className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-lime-500 to-green-600 text-transparent bg-clip-text py-2 dark:text-gray-300"
          >
            Meet Our Trusted Agents
          </h2>
          <p className="text-slate-600 dark:text-gray-300 text-sm sm:text-base mt-4 max-w-xl mx-auto ">
            At Trust Life, our agents ensure personalized service and expert
            guidance. Discover a few of our most dedicated team members below.
          </p>
        </div>
      </div>

       <Marquee pauseOnHover speed={35} gradient={false} className="py-4">
         {agents.map((agent, index) => (
           <div key={index} className="group mx-4 w-80 sm:w-96">
             <div className="relative h-full bg-white dark:bg-slate-800/80 dark:backdrop-blur-sm rounded-2xl border border-slate-100 dark:border-slate-700/50 p-6 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.12)] will-change-transform backface-hidden">
              {/* Accent top line */}
              <div className="absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r from-emerald-400 to-cyan-400 transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />

              <div className="flex flex-col items-center text-center">
                {/* Avatar with ring animation */}
                <div className="relative mb-5">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-40" />
                   <div className="relative w-28 h-28 rounded-full p-[3px] bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-900/40 dark:to-cyan-900/40 transition-transform duration-500 group-hover:scale-105 will-change-transform backface-hidden">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                      <img
                        src={agent.photoURL}
                        alt={agent.customerName}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform backface-hidden"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://i.ibb.co/4pDNDk1/avatar.png";
                        }}
                      />
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {agent.customerName}
                </h3>

                <div className="mt-2 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <IoMdMail className="w-4 h-4" />
                  <span className="truncate max-w-[220px]">{agent.email}</span>
                </div>

                {/* Hover-reveal tag */}
                <div className="mt-5 opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                    Licensed Agent
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default MeetOurAgent;
