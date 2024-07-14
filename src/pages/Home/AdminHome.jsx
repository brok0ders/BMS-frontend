import React, { useContext, useEffect, useState } from "react";
import MenuCard from "../../components/Home/MenuCard";
import MenuList from "../../components/Home/MenuList";
import UserContext from "../../context/user/userContext";
import Loader from "../../components/Layout/Loader";

const AdminHome = () => {
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
    gettingUser();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className={`bg-gradient-to-r from-cyan-100 to-cyan-100 via-white mt-0 ${
              loading ? "blur-background" : ""
            }`}
          >
            <div className="text-center text-2xl py-8 md:text-5xl">
              {user?.name}
            </div>
          </div>
          <MenuList />
        </>
      )}
    </>
  );
};

export default AdminHome;
