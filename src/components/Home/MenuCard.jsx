import React from "react";

const MenuCard = ({ image, text }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div className="flex justify-center items-center bg-gradient-to-r from-blue-100 to-green-100 rounded-full w-36 h-36">
        <img src={image} alt="#" width={100} />
      </div>
      <h1 className="mx-4 my-2">{text}</h1>
    </div>
  );
};

export default MenuCard;
