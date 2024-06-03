import Adminnavbar from "@components/adminnavbar/Adminnavbar";
import encryptDecrypt from "functions/encryptDecrypt";
import { Outlet, useNavigate } from "react-router-dom";

const AdminTemplate = () => {
    const navigate = useNavigate();
    if (encryptDecrypt.decrypt(localStorage.getItem('accesstoken'))) {
        navigate('/login')
    }

    return (
        <>
            <div className="flex h-fit w-full justify-between">
                <Adminnavbar />
                <Outlet />
            </div>

        </>
    )
}

export default AdminTemplate