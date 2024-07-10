import { useState } from "react";
import API from "../../utils/API";
import UserContext from "./userContext";
import { checkGridRowIdIsValid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

const UserState = (props) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get("/user/details", config);
      if (data.success) {
        setUser(data.user);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const userLogin = async ({ username, password }) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await API.post(
        "/user/login",
        { username, password },
        config
      );
      console.log(data);
      if (data.success) {
        setUser(data.user);
      }
      return data;
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

  const userRegister = async ({
    name,
    username,
    email,
    mobile,
    password,
    addressGodown,
    FLliscensee,
    address,
    TINno,
    PANno,
  }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await API.post(
      "/user/register",
      {
        name,
        username,
        email,
        mobile,
        password,
        addressGodown,
        FLliscensee,
        address,
        TINno,
        PANno,
      },
      config
    );
    console.log(data);
    if (data.success) {
      setUser(data.user);
    }
    return data;
  };

  const userUpdate = async ({ email, password }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.put(
        "/user/update",
        { email, password },
        config
      );
      if (data.success) {
        setUser(data.user);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const deleteEmail = async ({ email }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.delete(
        "/user/email/delete",
        { email },
        config
      );
      if (data.success) {
        setUser(data.user);
      }
      console.log(data.message);
      return data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getUser,
        userRegister,
        userLogin,
        userUpdate,
        deleteEmail,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
