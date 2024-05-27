import axios, { AxiosInstance } from "axios";

const Instance: AxiosInstance = axios.create(
    { baseURL: import.meta.env.BASE_URL }
)

export default Instance;