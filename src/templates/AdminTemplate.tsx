import Adminnavbar from "@components/AdminNavbar/Adminnavbar"
import { Outlet } from "react-router-dom"

const AdminTemplate = () => {
    return (
        <>
            <div className="flex">

                <Adminnavbar />
                <Outlet />
            </div>

        </>
    )
}

export default AdminTemplate