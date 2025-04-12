import React from "react";
import loader from "/images/beer-loader.gif";

const Loader = () => {
  return (
    <>
      <div className="z-50 flex justify-center items-center absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm">
        {/* <img src={loader} alt="Loading..." className="w-[6rem]" /> */}
        <div class="loader"></div>
      </div>
    </>
  );
};

export default Loader;
