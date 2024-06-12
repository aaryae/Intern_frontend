import Admindetail from "@components/admindetail/Admindetail";
import Paginationlist from "@components/paginationlist/Paginationlist";
import Searchadmin from "@components/searchadmin/Searchadmin";
import { ChevronDown, ChevronUp, MoveLeft, MoveRight } from 'lucide-react';
import { useEffect, useState } from "react";
import { apiresponse, editUserInterface, paginationdatatype } from "types/global.types";
import Heading from "utils/themes/components/Heading";
import { default as axios, default as axiosInstance } from "../../service/Instance";

const Adminlist = () => {
    //state for storing the get method of the api 
    const [fetchdata, setfetchdata] = useState<apiresponse[]>([]);
    //state that is use to send to editadmin for the default value that we get from the fetchdata
    const [admindata, setadmindata] = useState<apiresponse | editUserInterface | null>();
    // modal state that is use for redirecting to adminlist when update or view admin list
    const [popup, setpopup] = useState<boolean>(false);
    //state for sorting
    const [sortList, setSortList] = useState<boolean>(true);
  
    //pagination 
    const [perpage, setperpage] = useState<number>(5)
    const [onpagechange, setonpagechange] = useState<number>(1)
    const [paginationdata, setpaginationdata] = useState<paginationdatatype>({
        currentPage: 1,
        perpage,
        total: 10,
        totalPages: 1,
    });
    //searchstate
    const [searchval, setsearchval] = useState<string>('')
    //if user not found then message state
    const [errormessage, seterrormessage] = useState<string>('')

    //initial fetch of the adminlists
    const fetchadminlist = async (onpagechange:number, perpage:number, searchval:string) => {
        try {
                const response = await axios({
                    method: 'get',
                    url: '/admin',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
                        },
                        params: {
                        search:searchval,
                        page:onpagechange,
                        perpage: perpage,
                        
                        }
                        });
                        if (response.data.data?.data.length === 0) {
                                        seterrormessage(" UserName not found .")
                                    } else {
                                        seterrormessage('')
                                    }
                        setfetchdata(response.data.data?.data);
                        setpaginationdata(response.data.data?.pagination);
                     
                        
                        
                        } catch (error) {
                            console.error(error);
                            }
                            };
                            
     useEffect(() => {
        fetchadminlist(onpagechange, perpage,searchval);
    }, [onpagechange, perpage,searchval]);
    //delete of the user
    const handledelete = (id?: string) => {
        const deletedata = async () => {
            try {
                await axiosInstance({
                    method: 'delete',
                    url: `/admin/${id}`,
                    data: { id },
                });

                setfetchdata(prevData => prevData.filter(item => item.id !== id));
            } catch (error) {
                console.error(error);
            }
        };

        deletedata();
    };

    const handleitemdata = (item: apiresponse | null) => {
        setadmindata(item);
        setpopup(prevpopup => !prevpopup);
    };

    //sorting basis of firstname
    const handleSortClick = () => {
        setSortList(prevStatus => {
            const newStatus = !prevStatus;
            const sortedList = [...fetchdata].sort((a, b) => {
                const firstNameA = a.details.firstName?.en;
                const firstNameB = b.details.firstName?.en;
                if (newStatus) {
                    return firstNameB.localeCompare(firstNameA); // Descending order
                } else {
                    return firstNameA.localeCompare(firstNameB); // Ascending order
                }
            });
            setfetchdata(sortedList);
            return newStatus;
        });
    };
    
    //Userupdate
    const handleUserUpdate = (updatedUser: apiresponse) => {
        setfetchdata((prevfetchdata) =>
            prevfetchdata.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        handlepopup();
    };

    //popup that is use to pass to the createadmin.tsx for closing the modal after returning true
    const handlepopup = () => {
        setpopup(prevpopup => !prevpopup);
    };



    const updatepaginationlist = (paginationnumber: number) => {
        setonpagechange(paginationnumber)
    }

    
    const handlesearchfunction = (searchdata: string) => {
        setsearchval(searchdata);
    }
  
    
    return (
        <div className=" flex flex-col items-center justify-center">
            <Heading value="Admin List" />
            {/* searchbar */}

            <Searchadmin handlesearchfunction={handlesearchfunction} />
            <span className="text-sm text-red-700 p-2"> {errormessage}</span>

            {/* admin table */}
            <div className="w-full overflow-x-auto ">
                <table className="w-full table-auto text-center text-sm">
                    <thead className="border-2 border-black">
                        <tr className="">
                            <th className="border-2 border-black py-2 px-1">S.N.</th>
                            <th className="flex justify-center items-center py-2 px-1 ">FirstName
                                <div className=" cursor-pointer" onClick={handleSortClick}>
                                    {sortList === true && <ChevronUp size={16} />}
                                    {sortList === false && <ChevronDown size={16} />}
                                </div>
                            </th>
                            <th className="border-2 border-black py-2 px-1">Lastname</th>
                            <th className="border-2 border-black py-2 px-1">Phone Number</th>
                            <th className="border-2 border-black py-2 px-1">Email</th>
                            <th className="border-2 border-black py-2 px-1">Role</th>
                            <th className="border-2 border-black py-2 px-1">Username</th>
                            <th className="border-2 border-black py-2 px-1">Detail</th>
                            <th className="border-2 border-black py-2 px-1">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="border-2 border-black">
                        {fetchdata && fetchdata.map((item, index) => (
                            <tr key={index} className="border">
                                <td className="border-2 border-black py-2 ">{(paginationdata?.currentPage-1)*paginationdata?.perpage+index+1}</td>
                                <td className="border-2 border-black py-2">{item.details.firstName?.en}</td>
                                <td className="border-2 border-black py-2">{item.details.lastName?.en}</td>
                                <td className="border-2 border-black py-2">{item.details.phoneNumber ?? "NULL"}</td>
                                <td className="border-2 border-black py-2">{item.email}</td>
                                <td className="border-2 border-black py-2 capitalize">{item.role?.toLowerCase()?.replace("_", " ")}</td>
                                <td className="border-2 border-black py-2">{item.username}</td>
                                <td className="border-2 border-black py-2">
                                    <p onClick={() => handleitemdata(item)} className="underline cursor-pointer text-blue-600 hover:text-red-700">view</p>
                                </td>
                                <td className="border-2 border-black">
                                    <div onClick={() => handledelete(item?.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash text-red-800 flex items-center w-full cursor-pointer">
                                            <path d="M3 6h18" />
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="flex items-center justify-between bg-transparent px-4 py-3 sm:px-6">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">

                        {/* perpage search */}
                        
                            <p className="text-sm text-gray-700">
                                Per page
                                <select
                                    name="perPage"
                                    id="perPage"
                                    className="ml-2"
                                    onChange={(e) => {
                                        const newPerPage = Number(e.target.value);
                                        setperpage(newPerPage);
                                        // fetchadminlist(onpagechange, perpage,searchval) 
                                    }}
                                >
                                    {[5, 10, 15, 20].map((value, index) => (
                                        <option key={index} value={value}>{value}</option>
                                    ))}
                                </select>
                            </p>
                    

                        {/* paginationslider */}

                        <div className="flex gap-2">
                            <MoveLeft />
                            <Paginationlist totalPages={paginationdata.totalPages} updatepaginationlist={updatepaginationlist} />
                            <MoveRight />
                        </div>
                    </div>
                </div>

            </div>
            {/* Popup for admin details */}
            {
                popup && (
                    <div className="fixed flex items-center justify-center bg-black inset-0 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <div className="flex justify-end">
                                <span className="text-red-700 cursor-pointer hover:underline" onClick={() => handleitemdata(null)}>close</span>
                            </div>
                            <Admindetail admindata={admindata} handleUserUpdate={handleUserUpdate} dialog={handlepopup} />
                        </div>
                    </div>
                )
            }
            
           
        </div >
    );
};

export default Adminlist;



