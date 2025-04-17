import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";
import UserContext from "../../context/user/userContext";
import Loader from "../../components/Layout/Loader";

const BillSelection = () => {
  const { getUser } = useContext(UserContext);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const gettingUser = async () => {
    try {
      setLoading(true);
      const res = await getUser();
      setUser(res.user);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    gettingUser();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="relative">
          <div className="text-center relative text-2xl md:text-5xl md:py-6 bg-gradient-to-r from-blue-100 to-blue-100 via-white py-10">
            <BackButton className={"!absolute top-5 -translate-y-1/2 left-3"} />
            {user?.name}
          </div>
          <div className="bg-[#f6f6f6]">
            <div className="flex flex-col items-center justify-center md:mt-[15vh] mt-9">
              <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:gap-40 md:gap-36 sm:gap-14 gap-11">
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
      )}
    </>
  );
};

export default BillSelection;
