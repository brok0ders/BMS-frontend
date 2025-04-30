import React, { useContext, useEffect, useState } from "react";
import MenuCard from "../../components/Home/MenuCard";
import MenuList from "../../components/Home/MenuList";
import UserContext from "../../context/user/userContext";
import Loader from "../../components/Layout/Loader";
import AdminHome from "./AdminHome";
import DashboardCL from "../CL2/DashboardCL";

const Dashboard = () => {
  const { user, getUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const gettingUser = async () => {
    try {
      setLoading(true);
      const res = await getUser();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // gettingUser();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {user?.gType === "fl" ? (
            <AdminHome user={user} />
          ) : (
            <DashboardCL user={user} />
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
