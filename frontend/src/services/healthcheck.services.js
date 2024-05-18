import { servicesAxiosInstance } from "./config"

const getAPIStatus = async() => {
    return await servicesAxiosInstance.get('/api/v1/healtcheckup/')
}

const getServerStatus = async() => {
    return await servicesAxiosInstance.get('/')
}

const getAuthAPIStatus = async() => {
    return await servicesAxiosInstance.get('/api/v1/healtcheckup/auth')
}

const getPaymentAPIStatus = async() => {
    return await servicesAxiosInstance.get('/api/v1/healtcheckup/payment')
}

const getNotificationAPIStatus = async() => {
    return await servicesAxiosInstance.get('/api/v1/healtcheckup/notification')
}

export {
    getServerStatus,
    getAPIStatus,
    getAuthAPIStatus,
    getPaymentAPIStatus,
    getNotificationAPIStatus
}