import Adminnavbar from "@components/adminnavbar/Adminnavbar"
import { Outlet } from "react-router-dom"

const AdminTemplate = () => {
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