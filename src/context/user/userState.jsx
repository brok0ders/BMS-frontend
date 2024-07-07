import { useState } from "react";
import API from "../../utils/API";
import UserContext from "./userContext";

const UserState = (props) => {
    const [user, setUser] = useState({});

    const getUser = async() => {
        const config = {
            "Authorization": localStorage.getItem("token"),
        }
        const {data} = await API.get("/user/details", config);
        if (data.success) {
            setUser(data.user);
            console.log(data.message);
            return data.user;
        }
        console.log(data.message);
        return undefined;
    }

    const userLogin = async({username, password}) => {
        const config = {
            "Content-Type": "application/json",
        }
        const {data} = await API.post("/user/login", {username, password}, config);
        if (data.success) {
            setUser(data.user);
            console.log(data.message);
            return data.user;
        }
        console.log(data.message);
        return undefined;
    }

    
    const userRegister = async({name, username, password}) => {
        const config = {
            "Content-Type": "application/json",
        }
        const {data} = await API.post("/user/register", {name, username, password}, config);
        if (data.success) {
            setUser(data.user);
            console.log(data.message);
            return data.user;
        }
        console.log(data.message);
        return undefined;
    }

    
    const userUpdate = async({name, email, username, password}) => {
        const config = {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
        }
        const {data} = await API.put("/user/update", {name, email, username, password}, config);
        if (data.success) {
            setUser(data.user);
            console.log(data.message);
            return data.user;
        }
        console.log(data.message);
        return undefined;
    }


  return (
    <UserContext.Provider value={{
        getUser,
        userRegister,
        userLogin,
        userUpdate,
    }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
