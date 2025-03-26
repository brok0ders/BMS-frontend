import React, { useContext, useEffect, useState } from "react";
import MenuCard from "../../components/Home/MenuCard";
import add from "/images/create.png";
import bills from "/images/BillRecords.png";
import liquor from "/images/liquor.png";

import analytics from "/images/analytics.png";

const DashboardCL = ({ user }) => {
  return (
    <>
      <div
        className={`bg-gradient-to-r from-cyan-100 to-cyan-100 via-white mt-0`}
      >
        <div className="text-center text-2xl py-8 md:text-5xl">
          {user?.name}
        </div>
      </div>
      <div className="mx-10 md:mx-20 my-10 grid grid-cols-2 md:grid-cols-4 gap-10">
        <MenuCard menu={"select"} image={add} text={"Create Bill"} />
        <MenuCard menu={"bill/records"} image={bills} text={"Bills"} />
        <MenuCard menu={"cl/cllist"} image={liquor} text={"Stock"} />
        <MenuCard menu={"analytics"} image={analytics} text={"Analytics"} />
      </div>
    </>
  );
};

export default DashboardCL;
