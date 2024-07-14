import React from "react";
import { Link } from "react-router-dom";

const MenuCard = ({ image, text, menu }) => {
  return (
    <Link to={menu} className="flex flex-col justify-center items-center gap-1">
      <div className="flex justify-center items-center bg-gradient-to-r from-blue-100 to-green-100 rounded-full w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem]">
        <img src={image} alt="#" className="w-[4.8rem] md:w-[5.6rem]" />
      </div>
      <h1 className="mx-4 my-2">{text}</h1>
    </Link>
  );
};

export default MenuCard;
