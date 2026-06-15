import React from "react";
import ProfilePage from "../../../../../shared/ProfilePage/ProfilePage";
import { Helmet } from "react-helmet-async";

const AgentDashboardHome = () => {
  return (
    <div>
      <Helmet>
        <title>Trust Life | Dashboard Home</title>
      </Helmet>
      <ProfilePage></ProfilePage>
    </div>
  );
};

export default AgentDashboardHome;
