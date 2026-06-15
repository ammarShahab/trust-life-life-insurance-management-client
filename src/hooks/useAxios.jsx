import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://b11a12-server-side-ammar-shahab.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
