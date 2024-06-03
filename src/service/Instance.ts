import axios, { AxiosInstance } from "axios";
import encryptDecrypt from "functions/encryptDecrypt";

const axiosInstance: AxiosInstance = axios.create(
    {
        baseURL: import.meta.env.VITE_APP_BASE_URL,
        timeout: import.meta.env.VITE_APP_TIME_OUT
    }
)

axiosInstance.interceptors.request.use(async (config: any) => {
    config.headers.Authorization = `Bearer ${encryptDecrypt.decrypt(localStorage.getItem("accesstoken") as string)}`
    return config
})

export default axiosInstance;