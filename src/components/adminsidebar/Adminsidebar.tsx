import { useState } from 'react';
import { Link } from "react-router-dom";
import Label from "../../utils/themes/components/Label";

const Adminsidebar = () => {

    const [activeLink, setActiveLink] = useState("Home");

    const handleClick = () => {
        localStorage.removeItem('accesstoken');
    }


    return (
        <div className="h-full fixed w-[300px] bg-[#1c212c] text-white  pt-10 z-50">
            <div className="flex flex-col p-5 gap-2">
                <Label value="Menu" />

                <Link
                    to="/admin"
                    className={` flex gap-1 hover:text-[#ffffff5d] mx-2  ${activeLink === "Home" ? "text-red-700" : ""}`}
                    onClick={() => setActiveLink("Home")}
                >
                    {/* <svg className="h-5 w-5 !fill-red-500 group-hover:fill-red-600 dark:fill-gray-600  transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M5 22h14a2 2 0 0 0 2-2v-9a1 1 0 0 0-.29-.71l-8-8a1 1 0 0 0-1.41 0l-8 8A1 1 0 0 0 3 11v9a2 2 0 0 0 2 2zm5-2v-5h4v5zm-5-8.59 7-7 7 7V20h-3v-5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5H5z"></path>
            </svg> */}
                    Home
                </Link>
                <Link
                    to="/admin/dashboard"
                    className={`flex gap-1 hover:text-[#ffffff5d] mx-2 ${activeLink === "Dashboard" ? "text-red-700" : ""}`}
                    onClick={() => setActiveLink("Dashboard")}
                >
                    {/* <svg className={`flex h-5 w-5  group-hover:fill-red-600 dark:fill-gray-600 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24`}>
                <g>
                    <path d="M19 2H9c-1.11 0-2 .89-2 2v5.586l-4.707 4.7v0c-.4.39-.4 1.02 0 1.41 .18.18.44.29.7.29v5 0c0 .55.44 1 1 1h16v0c.55 0 1-.45 1-1v-17c0-1.11-.9-2-2-2Zm-8 18H5v-5.586l3-3 3 3V20Zm8 0h-6v-4 0c.55 0 .99-.45 1-1 0-.27-.11-.53-.3-.72L8.99 9.57V3.984h10v16Z"></path>
                    <path d="M11 6h2v2h-2Zm4 0h2v2h-2Zm0 4.03h2v1.96h-2Zm0 3.96h2v2h-2Zm-8 1h2v2H7Z"></path>
                </g>
            </svg> */}
                    Dashboard
                </Link>
            </div>
            <div className="flex  flex-col p-5 gap-2">
                <Label value="Admins" />
                <Link
                    to="/admin/manageadmin"
                    className={`flex gap-1 hover:text-[#ffffff5d] mx-2 ${activeLink === "Manage Admin" ? "text-red-700" : ""}`}
                    onClick={() => setActiveLink("Manage Admin")}
                >
                    {/* <svg className="h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
            </svg> */}
                    Manage Admin
                </Link>
                <Link
                    to="/admin/changepassword"
                    className={` flex gap-1 hover:text-[#ffffff5d] mx-2 ${activeLink === "Change Password" ? "text-red-700" : ""}`}
                    onClick={() => setActiveLink("Change Password")}
                >
                    {/* <svg className="h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
            </svg> */}
                    Change Password
                </Link>
                <Link
                    to="/login"
                    className={` flex gap-1 hover:text-[#ffffff5d] mx-2 ${activeLink === "Log Out" ? "text-red-700" : ""}`}
                    onClick={() => {
                        setActiveLink("Log Out");
                        handleClick();
                    }}
                >
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out mt-1"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg> */}
                    Log Out
                </Link>
            </div>
        </div>
    )
}

export default Adminsidebar