import axios from "axios";
export const BASE_URL = "http://localhost:1337/api/";

export const AxiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type":"application/json"
    }
});

AxiosConfig.defaults.headers.common.Accept = "application/json";
AxiosConfig.defaults.headers.common["Content-Type"] = "application/json";