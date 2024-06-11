// import Adminnavbar from "@components/adminnavbar/Adminnavbar";
import Adminnavbar from "@components/AdminNavbar/Adminnavbar";
import Adminsidebar from "@components/adminsidebar/Adminsidebar";
import { Outlet } from "react-router-dom";

const AdminTemplate = () => {
    return (
        <>
            <Adminsidebar />
            <Adminnavbar />
            <div
                className="pt-12 pl-[300px] "

            >
                <Outlet />

            </div>
        </>
    );
};

export default AdminTemplate;
