import { Link, useNavigate } from "react-router-dom";

const Adminnavbar = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem('accesstoken');
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
                    <button onClick={() => {
                        navigate("/login")
                        handleClick();
                    }} className="float-right flex gap-1">logout
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out mt-1"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg> */}
                    </button>
                </div>
                <hr className="absolute w-full bottom-0" />
            </div>
        </>
    );
}

export default Adminnavbar;

