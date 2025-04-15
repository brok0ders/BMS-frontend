import React, { useContext, useEffect, useState } from "react";
import CustomerContext from "../../context/customer/customerContext";
import { useScatterChartProps } from "@mui/x-charts/internals";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Layout/Loader";

const clients = [
  { name: "TechNova Inc.", logo: "/logos/technova.png" },
  { name: "ShopVerse", logo: "/logos/shopverse.png" },
  { name: "BlueOak Partners", logo: "/logos/blueoak.png" },
  { name: "PixelForge", logo: "/logos/pixelforge.png" },
  { name: "NextEdge Systems", logo: "/logos/nextedge.png" },
  { name: "GlobalCore Enterprises", logo: "/logos/globalcore.png" },
];

const LicenseeList = () => {
  const [loading, setLoading] = useState(true);
  const [licensee, setLicensee] = useState([]);
  const { getAllCustomer } = useContext(CustomerContext);
  const getLisencee = async () => {
    try {
      const res = await getAllCustomer();
      console.log("customers: ", res);
      setLicensee(res.customer);
    } catch (error) {
      console.error("Error fetching beers:", error);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`${id}`);
  };
  useEffect(() => {
    getLisencee();
  }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Our All Licensee
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-stretch">
          {licensee.map((lin, index) => (
            <div
              key={index}
              onClick={() => {handleClick(lin?._id)}}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition 
                 h-32 sm:h-36 md:h-40 flex flex-col justify-between"
            >
              <p className="text-sm font-medium text-gray-600 break-words whitespace-normal">
                {lin?.licensee}
              </p>
              <p className="text-sm font-medium text-gray-600 break-words whitespace-normal">
                {lin?.firm}
              </p>
              <p className="text-sm font-medium text-gray-600 break-words whitespace-normal">
                {lin?.pan}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LicenseeList;
