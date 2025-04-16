import React, { useContext, useEffect, useState } from "react";
import CustomerContext from "../../context/customer/customerContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Layout/Loader";
import { Search, Building, User, CreditCard } from "lucide-react";

const LicenseeList = () => {
  const [loading, setLoading] = useState(true);
  const [licensees, setLicensees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { getAllCustomer } = useContext(CustomerContext);
  const navigate = useNavigate();

  const fetchLicensees = async () => {
    try {
      const res = await getAllCustomer();
      console.log("customers: ", res);
      setLicensees(res.customer);
    } catch (error) {
      console.error("Error fetching licensees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (id) => {
    navigate(`${id}`);
  };

  const filteredLicensees = licensees.filter(
    (licensee) =>
      licensee?.licensee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      licensee?.shop?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      licensee?.pan?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchLicensees();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Licensee Directory
          </h2>
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search licensees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {filteredLicensees.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-lg text-gray-600">
              No licensees found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLicensees.map((licensee) => (
              <div
                key={licensee._id}
                onClick={() => handleClick(licensee._id)}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer border border-gray-200 overflow-hidden"
              >
                <div className="bg-gray-100 p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-lg text-gray-800 truncate">
                    {licensee?.licensee || "Unnamed Licensee"}
                  </h3>
                </div>
                <div className="p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <Building
                      size={18}
                      className="text-blue-600 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-gray-700">
                      {licensee?.shop || "No shop information"}
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CreditCard
                      size={18}
                      className="text-blue-600 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-gray-700">
                      {licensee?.pan
                        ? `PAN: ${licensee.pan}`
                        : "No PAN information"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-gray-500 mt-6">
          Total Licensees: {filteredLicensees.length}
        </p>
      </div>
    </section>
  );
};

export default LicenseeList;
