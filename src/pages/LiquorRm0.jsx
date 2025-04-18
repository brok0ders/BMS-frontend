import React from "react";
import API from "../utils/API";


const LiquorRm0 = () => {
  const handleRemove = async () => {
    try {
      await API.delete(`/master-liquor/rm0`);
      await API.delete(`/master-beer/rm0`);
      alert("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete.");
    }
  };

  return (
    <div
      className="bg-blue-700 text-white w-full text-center py-1 px-10 block max-auto mt-36 cursor-pointer"
      onClick={handleRemove}
    >
      Remove liquor and Beer with excise = 0
    </div>
  );
};

export default LiquorRm0;
