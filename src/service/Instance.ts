import axios from "axios";

export const axio = axios.create(
    {
        baseURL: import.meta.env.VITE_APP_BASE_URL,
        timeout: import.meta.env.VITE_APP_
    }
)

