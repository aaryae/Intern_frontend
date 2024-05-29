import Navbar from "@components/navvbar/Navbar"
import Footer from "@components/footer/Footer"
import { Outlet } from "react-router-dom"

const AdminTemplate = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default AdminTemplate