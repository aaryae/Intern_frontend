import AdminTemplate from "@templates/AdminTemplate"
import encryptDecrypt from "functions/encryptDecrypt"
import { Navigate } from "react-router-dom"

const Protectedroute = () => {

    if (encryptDecrypt.decrypt(localStorage.getItem("accesstoken"))) {
        return <AdminTemplate />
    }
    else 
        return <Navigate to="/login" />
}

export default Protectedroute