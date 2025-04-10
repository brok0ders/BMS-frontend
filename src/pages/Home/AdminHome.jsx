import React, { useContext, useEffect, useState } from "react";
import MenuCard from "../../components/Home/MenuCard";
import MenuList from "../../components/Home/MenuList";
import UserContext from "../../context/user/userContext";
import Loader from "../../components/Layout/Loader";
/*  ${
          loading ? "blur-background" : ""
        }
        */
const AdminHome = ({ user }) => {
  return (
    <>
      <div
        className={`bg-gradient-to-r from-cyan-100 to-cyan-100 via-white mt-0`}
      >
        <div className="text-center text-2xl py-8 md:text-5xl">
          {user?.name}
        </div>
      </div>
      <MenuList />
    </>
  );
};

export default AdminHome;
