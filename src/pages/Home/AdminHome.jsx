import React from "react";
import MenuCard from "../../components/Home/MenuCard";
import MenuList from "../../components/Home/MenuList";

const AdminHome = () => {
  return (
    <>
    <div className="bg-gradient-to-r from-cyan-100 to-cyan-100 via-white h-24 mt-5">
      <div className="text-center text-2xl py-8 md:text-5xl ">M/s Maa Banari Devi Traders</div>
      <MenuList />
    </div>
    <div className="bg-[#f6f6f6] h-[75vh]">

    </div>
    </>
  );
};

export default AdminHome;
