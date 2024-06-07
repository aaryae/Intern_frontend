import Admindetail from "@components/admindetail/Admindetail";
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
    const [showRoleDetails, setShowRoleDetails] = useState<boolean>(false);
    const [paginationdata, setpaginationdata] = useState<paginationdatatype>({
        currentPage: 1,
        perpage: 10,
        total: undefined,
        totalPages: undefined,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: '/admin',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
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

    const handleUserUpdate = (updatedUser: apiresponse) => {
        setfetchdata((prevfetchdata) =>
            prevfetchdata.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        handlepopup();
    };

    const handlepopup = () => {
        setpopup(prevpopup => !prevpopup);
    };

    const handlepagination = async (page: number, perpage: number) => {
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

    return (
        <div className=" flex flex-col items-center justify-center">
            <Heading value="Admin List" />
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
                        <div>
                            <p className="text-sm text-gray-700">
                                Per page
                                <select
                                    name="perPage"
                                    id="perPage"
                                    className="ml-2"
                                    onChange={(e) => handlepagination(1, Number(e.target.value))}
                                >
                                    {[5, 10, 15, 20].map((value, index) => (
                                        <option key={index} value={value}>{value}</option>
                                    ))}
                                </select>
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <a
                                    href="#"
                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    onClick={() => handlepagination(Math.max(1, paginationdata.currentPage - 1), paginationdata.perpage)}
                                >
                                    <span className="sr-only">Previous</span>
                                    <MoveLeft />
                                </a>
                                {Array.from({ length: paginationdata.totalPages ?? 0 }).map((_, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${paginationdata.currentPage === index + 1 ? 'bg-[#1c212c] text-white' : 'text-gray-900'} ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                                        onClick={() => handlepagination(index + 1, paginationdata.perpage)}
                                    >
                                        {index + 1}
                                    </a>
                                ))}
                                <a
                                    href="#"
                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    onClick={() => handlepagination(Math.min(paginationdata.totalPages ?? 1, paginationdata.currentPage + 1), paginationdata.perpage)}
                                >
                                    <span className="sr-only">Next</span>
                                    <MoveRight />
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* Popup for admin details */}
            {popup && (
                <div className="fixed flex items-center justify-center bg-black inset-0 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-end">
                            <span className="text-red-700 cursor-pointer hover:underline" onClick={() => handleitemdata(null)}>close</span>
                        </div>
                        <Admindetail admindata={admindata} admindatafunction={handleUserUpdate} dialog={handlepopup} />
                    </div>
                </div>
            )}
            {/* Role details */}
            <div className="absolute top-16 right-44">
                <Button input="role details" onClick={showroledetail} />
            </div>
            {showRoleDetails && (
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
            )}
            {/* <Button input="fetchdata" onClick={() => handlepagination(1, paginationdata.perpage)} /> */}
        </div>
    );
};

export default Adminlist;
