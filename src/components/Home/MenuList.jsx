import React from "react";
import MenuCard from "./MenuCard";
import add from "/images/create.png";
import bills from "/images/BillRecords.png"
import beer from "/images/beer.png"
import liquor from "/images/liquor.png"
import company from "/images/companies.png"
import analytics from "/images/analytics.png"


const MenuList = () => {
  return (
    <>
      <div className="mx-20 my-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        <MenuCard image={add} text={"Create Bill"} />
        <MenuCard image={bills} text={"Bills"} />
        <MenuCard image={beer} text={"Beers"} />
        <MenuCard image={liquor} text={"Liquors"} />
        <MenuCard image={company} text={"Companies"} />
        <MenuCard image={analytics} text={"Analytics"} />
      </div>
    </>
  );
};

export default MenuList;
