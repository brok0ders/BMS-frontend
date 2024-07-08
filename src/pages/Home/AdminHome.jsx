import React from "react";
import MenuCard from "../../components/Home/MenuCard";
import MenuList from "../../components/Home/MenuList";

const AdminHome = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-100 via-white h-24 mt-5">
      <div className="text-center text-2xl py-8 text-5xl">M/s Maa Banari Devi Traders</div>
      <MenuList />
    </div>
  );
};

export default AdminHome;
