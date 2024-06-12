import { X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Adminnavbar = () => {

    const navigate = useNavigate();
    const [confirmationmodal, setconfirmatiommodal] = useState<boolean>(false)

    const handleClick = () => {
        setconfirmatiommodal(prevconfirmationmodal => !prevconfirmationmodal)
       
        
    }
    const handleconfirmation=()=>{
        localStorage.removeItem('accesstoken');
        navigate("/login")
    }


    return (
        <>
            <div className="w-full h-[50px] bg-[#1c212c] text-white fixed z-50">
                <div className="logo pt-2">
                    <Link to="/admin" className="px-7 py-2 text-2xl tracking-widest">
                        aaryae
                    </Link>

                </div>
                <div className="absolute top-0 right-0 px-5 py-2">
                    <button onClick={
                        handleClick} className="float-right flex gap-1">logout
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out mt-1"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg> */}
                    </button>
                </div>
                <hr className="absolute w-full bottom-0" />
                {
                    confirmationmodal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white text-black p-6 rounded-lg shadow-lg ">
                                <div className='w-full  flex justify-center my-6'>


                                    <div className='w-fit p-2 border-2 border-black rounded-full text-center'>

                                        <X size={48} strokeWidth={3} color="#ff0000"/>
                                    </div>
                                </div>
                                <h1 className="text-2xl text-[#000000be] font-semibold mb-4">You are about to Logout</h1>
                                <p className="mb-4 text-[#00000085]">Do you really want to logout?</p>
                                <div className="flex gap-2 justify-evenly">
                                    <button onClick={handleconfirmation} className="px-4 py-2 my-2  bg-red-700 text-white rounded hover:bg-red-700 transition duration-200">Yes</button>
                                    <button onClick={handleClick} className="px-4 py-2 my-2 bg-[#000000d7] text-white rounded hover:bg-gray-700 transition duration-200">No</button>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </>
    );
}

export default Adminnavbar;

