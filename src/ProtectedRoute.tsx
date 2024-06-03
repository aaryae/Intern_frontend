import AdminTemplate from "@templates/AdminTemplate";
import encryptDecrypt from "functions/encryptDecrypt";
import { Navigate } from "react-router-dom";

const ProtrctedRoute = () => {
    if (encryptDecrypt.decrypt(localStorage.getItem('accesstoken') as string)) {
        return <AdminTemplate />;
    } else {
        return <Navigate to='/login' />
    }
};

export default ProtrctedRoute