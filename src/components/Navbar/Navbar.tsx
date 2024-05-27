import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbarhelper from "./Navbarhelper";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        setScrolled(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

    }, []);

    const handleClick = () => {
        setNav(prevNav => !prevNav);
    };



    return (
        <>



            <div className={` fixed w-full h-[10vh]  duration-300 ${scrolled ? "lingrad shadow-2xl" : "bg-transparent"}`} >


                <div className="flex justify-between max-w-7xl mx-auto h-full">


                    <h1 className="text-5xl tracking-wide font-bold m-2 my-auto text-white">aaryae</h1>
                    <ul className={`hidden md:flex my-auto  `}>
                        <li className="p-2 text-white  m-2 hovtext font-semibold "><Link to='/'>Home</Link></li>
                        <li className="p-2 text-white  m-2 hovtext font-semibold"><Link to='#'>About</Link></li>
                        <li className="p-2 text-white  m-2 hovtext font-semibold"><Link to='#'>Contact</Link></li>
                        <li className="p-2 text-white  m-2 hovtext font-semibold"><Link to='#'>Services</Link></li>
                        <li className="p-2 text-white  m-2 hovtext font-semibold"><Link to='/login'>Login</Link></li>
                    </ul>

                    <div onClick={handleClick} className="block md:hidden p-2 m-2 my-auto">
                        <i className="fa-solid fa-bars"></i>
                    </div>
                </div>
            </div>


            <Navbarhelper />

            {nav && (
                <ul className=" h-[100vh] fixed w-full block md:hidden bg-[#000000] text-white text-center index ">
                    <div className=" flex flex-col justify-center items-center h-full">

                        <li className="p-2  m-2 hover:text-[#1c1c4d] font-semibold"><Link to='/'>Home</Link></li>
                        <li className="p-2  m-2 hover:text-[#1c1c4d] font-semibold"><Link to='/about'>About</Link></li>
                        <li className="p-2  m-2 hover:text-[#1c1c4d] font-semibold"><Link to='/contact'>Contact</Link></li>
                        <li className="p-2  m-2 hover:text-[#1c1c4d] font-semibold"><Link to='/services'>Services</Link></li>
                        <li className="p-2  m-2 hover:text-[#1c1c4d] font-semibold"><Link to='/login'>Login</Link></li>
                    </div>
                    <div onClick={handleClick} className="absolute top-0 right-0  p-10">
                        <i className="fa-solid fa-x text-white"></i>
                    </div>
                </ul>
            )}
        </>
    );
};

export default Navbar;
