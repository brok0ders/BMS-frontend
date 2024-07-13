import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";

const BillSelection = () => {
  return (
    <div className="relative">
      <div className="text-center relative text-2xl py-8 md:text-5xl bg-gradient-to-r from-blue-100 to-blue-100 via-white mt-5 h-24">
        <BackButton className={"!absolute top-1/2 -translate-y-1/2 left-20"} />
        M/s Maa Banari Devi Traders
      </div>
      <div className="h-[75vh] bg-[#f6f6f6]">
        <div className="flex flex-col items-center justify-center h-[75vh] md:h-[50vh]">
          <div className="grid place-items-center place grid-cols-1 md:grid-cols-2 gap-28 mx-20 my-10">
            <Link to={"/dashboard/company/liquor?page=create"}>
              <div className="text-center">
                <div className="flex justify-center items-center bg-gradient-to-r from-blue-100 to-green-100 rounded-full w-36 h-36">
                  <img src="/images/liquorbill.png" alt="#" width={100} />
                </div>
                <h1 className="mx-4 my-2">Liquor Bill</h1>
              </div>
            </Link>
            <Link to={"/dashboard/company/beer?page=create"}>
              <div className="text-center">
                <div className="flex justify-center items-center bg-gradient-to-r from-blue-100 to-green-100 rounded-full w-36 h-36">
                  <img src="/images/beerbill.png" alt="#" width={100} />
                </div>
                <h1 className="mx-4 my-2">Beer Bill</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillSelection;
