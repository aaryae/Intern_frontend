import Admindetail from "@components/admindetail/Admindetail";
import Paginationlist from "@components/paginationlist/Paginationlist";
import Searchadmin from "@components/searchadmin/Searchadmin";
import { ChevronDown, ChevronUp, MoveLeft, MoveRight } from 'lucide-react';
import { useEffect, useState } from "react";
import { apiresponse, editUserInterface, paginationdatatype } from "types/global.types";
import Button from "utils/themes/components/Button";
import Heading from "utils/themes/components/Heading";
import { default as axios, default as axiosInstance } from "../../service/Instance";

const Adminlist = () => {
    const [fetchdata, setfetchdata] = useState<apiresponse[]>([]);
    const [admindata, setadmindata] = useState<apiresponse | editUserInterface | null>();
    const [popup, setpopup] = useState<boolean>(false);
    const [sortList, setSortList] = useState<boolean>(true);
    const [roleDetails, setRoleDetails] = useState<{ [key: string]: number }>({});
    const [perpage, setperpage] = useState<number>(5)
    const [showRoleDetails, setShowRoleDetails] = useState<boolean>(false);
    const [onpagechange, setonpagechange] = useState<number>(1)
    const [paginationdata, setpaginationdata] = useState<paginationdatatype>({
        currentPage: 1,
        perpage,
        total: undefined,
        totalPages: undefined,
    });

    //searchstate
    const [searchval, setsearchval] = useState<string>('')

    //initial fetch of the adminlists
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: '/admin',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
                    },
                    params: {
                        perpage: 5
                    }
                });

                setfetchdata(response.data.data?.data);
                setpaginationdata(response.data.data?.pagination);


            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
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
    //roledetail
    const showroledetail = () => {
        const roleCounts: { [key: string]: number } = {};

        fetchdata.forEach(item => {
            const role = item.role?.toLowerCase().replace("_", " ");
            if (role) {
                if (!roleCounts[role]) {
                    roleCounts[role] = 0;
                }
                roleCounts[role]++;
            }
        });
        setRoleDetails(roleCounts);
        setShowRoleDetails(true);
    };
    //Userupdate
    const handleUserUpdate = (updatedUser: apiresponse) => {
        setfetchdata((prevfetchdata) =>
            prevfetchdata.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        handlepopup();
    };

    const handlepopup = () => {
        setpopup(prevpopup => !prevpopup);
    };


    //paginationfetch
    const handlepagination = async (page: number, perpage?: number) => {
        try {
            const response = await axios({
                method: 'get',
                url: '/admin',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
                },
                params: {
                    page: page,
                    perpage: perpage,
                }
            });
            setfetchdata(response.data.data?.data);
            setpaginationdata(response.data.data?.pagination);
        } catch (error) {
            console.log(error);
        }
    };


    const updatepaginationlist = (paginationnumber: number) => {
        setonpagechange(paginationnumber)

    }

    useEffect(() => {
        handlepagination(onpagechange, perpage)
    }, [onpagechange, perpage])



    //search username

    const searchadminname = async (searchval: string) => {
        try {
            const response = await axios({
                method: 'get',
                url: '/admin',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
                },
                params: {
                    search: searchval
                }
            });
            setfetchdata(response.data.data?.data);
            setpaginationdata(response.data.data?.pagination);
        } catch (error) {
            console.log(error);
        }
    }

    const handlesearchfunction = (searchdata: string) => {
        console.log(searchval, "searchvalue")
        setsearchval(searchdata);

    }
    useEffect(() => {
        searchadminname(searchval)
    }, [searchval])



    return (
        <div className=" flex flex-col items-center justify-center">
            <Heading value="Admin List" />
            {/* searchbar */}

            <Searchadmin handlesearchfunction={handlesearchfunction} />

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
                                <td className="border-2 border-black py-2 ">{index + 1}</td>
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
                        <div>
                            <p className="text-sm text-gray-700">
                                Per page
                                <select
                                    name="perPage"
                                    id="perPage"
                                    className="ml-2"
                                    onChange={(e) => {
                                        const newPerPage = Number(e.target.value);
                                        setperpage(newPerPage);
                                        handlepagination(1, newPerPage);
                                    }}
                                >
                                    {[5, 10, 15, 20].map((value, index) => (
                                        <option key={index} value={value}>{value}</option>
                                    ))}
                                </select>
                            </p>
                        </div>

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
                            <Admindetail admindata={admindata} admindatafunction={handleUserUpdate} dialog={handlepopup} />
                        </div>
                    </div>
                )
            }
            {/* Role details */}
            <div className="absolute top-16 right-44">
                <Button input="role details" onClick={showroledetail} />
            </div>
            {
                showRoleDetails && (
                    <div className="fixed flex items-center justify-center bg-black inset-0 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <div className="flex justify-end">
                                <span className="text-red-700 cursor-pointer hover:underline" onClick={() => setShowRoleDetails(false)}>close</span>
                            </div>
                            <h2 className="text-xl font-bold mb-4">Role Details</h2>
                            <ul>
                                {Object.entries(roleDetails).map(([role, count]) => (
                                    <li key={role} className="mb-2"><span className="font-bold">{role}</span>: {count}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Adminlist;



