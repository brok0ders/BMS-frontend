import React from "react";
import MenuCard from "./MenuCard";
import add from "/images/create.png";
import bills from "/images/BillRecords.png";
import beer from "/images/beer.png";
import liquor from "/images/liquor.png";
import company from "/images/companies.png";
import analytics from "/images/analytics.png";
import calculator from "/images/calculator.png";

const MenuList = () => {
  return (
    <>
      <div className="mx-10 md:mx-20 my-10 grid grid-cols-2 md:grid-cols-4 gap-10">
        <MenuCard menu={"bill/create"} image={add} text={"Create Bill"} />
        <MenuCard menu={"bill/records"} image={bills} text={"Bills"} />
        <MenuCard menu={"company/beer"} image={beer} text={"Beers"} />
        <MenuCard menu={"company/liquor"} image={liquor} text={"Liquors"} />
        <MenuCard menu={"company?tab=all"} image={company} text={"Suppliers"} />
        <MenuCard menu={"analytics"} image={analytics} text={"Analytics"} />
        <MenuCard menu={"calculator"} image={calculator} text={"Amount Calculator"} />
      </div>
    </>
  );
};

export default MenuList;
