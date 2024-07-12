import React from "react";
import loader from "/images/beer-loader.gif";

const Loader = () => {
  return (
    <>
      <div className="flex justify-center items-center absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm">
        <img src={loader} alt="Loading..." className="w-[6rem]" />
      </div>
    </>
  );
};

export default Loader;
