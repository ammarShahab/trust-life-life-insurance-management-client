import React from "react";
import useCustomerRole from "../../../hooks/useCustomerRole";
import Loading from "../../../components/Loading/Loading";
import AgentDashboard from "./AgentDashboard/AgentDashboardHome/AgentDashboardHome";
import ForbiddenPage from "../../ForbiddenPage/ForbiddenPage";
import AdminDashBoardHome from "./AdminDashBoard/AdminDashBoardHome/AdminDashBoardHome";
import CustomerDashBoardHome from "./CustomerDashBoard/CustomerDashBoardHome/CustomerDashBoardHome";

const DashBoardHome = () => {
  const { role, isLoading } = useCustomerRole();

  // console.log("role from dash", role);

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (role === "admin") {
    return <AdminDashBoardHome></AdminDashBoardHome>;
  }
  if (role === "agent") {
    return <AgentDashboard></AgentDashboard>;
  }
  if (role === "customer") {
    return <CustomerDashBoardHome></CustomerDashBoardHome>;
  }

  return <ForbiddenPage></ForbiddenPage>;
};

export default DashBoardHome;
