import axios from "axios";
// import { BACKEND_URL } from "../../../utils/url";

export const AUTH_URL = '$(BACKEND_URL)/users/';


const regiter = async (userData) => {
    const response = await axios.post(AUTH_URL + "register", userData);
    console.log(response);
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(AUTH_URL + "login", userData);
    return response.data;
}

const logOut = async () => {
    const response = await axios.get(AUTH_URL + "logOut");
    return response.data.message;
}

const getLogInStatus = async () => {
    const response = await axios.get(AUTH_URL + "loggedIn");
    return response.data;
}

const getuserProfile = async () => {
    const response = await axios.get(AUTH_URL + "getuser");
    return response.data;
}

const loginUserAsSeller = async (useData) => {
    const response = await axios.post('$(AUTH_URL)/seller' + useData, {
        withCredentials: true,
    });
    return response.data;
}

const getuserIncome = async () => {
    const response = await axios.get(AUTH_URL + "sell-amount");
    return response.data;
}

const getIncome = async () => {
    const response = await axios.get(AUTH_URL + "estimate-income");
    return response.data;
}

const getAllUser = async () => {
    const response = await axios.get(AUTH_URL + "users");
    return response.data;
}

const authService = {
    regiter,
    login,
    logOut,
    getLogInStatus,
    getuserProfile,
    loginUserAsSeller,
    getuserIncome,
    getIncome,
    getAllUser,
};
export default authService;