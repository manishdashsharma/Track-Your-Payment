import axios from "axios";

const servicesAxiosInstance = axios.create({
    // baseURL: "http://localhost:5000",
    baseURL: "https://trackyourpayment.hehe.rest",
});

export {
    servicesAxiosInstance
}