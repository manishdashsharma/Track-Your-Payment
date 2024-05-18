import axios from "axios";

const servicesAxiosInstance = axios.create({
    baseURL: "http://localhost:5000",
});

export {
    servicesAxiosInstance
}