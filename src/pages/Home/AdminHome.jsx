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
      console.log(res);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    gettingUser;
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-gradient-to-r from-cyan-100 to-cyan-100 via-white h-24 mt-5">
            <div className="text-center text-2xl py-8 md:text-5xl ">
              {user?.name}
            </div>
            <MenuList />
          </div>
          <div className="bg-[#f6f6f6] h-[75vh]"></div>
        </>
      )}
    </>
  );
};

export default AdminHome;
