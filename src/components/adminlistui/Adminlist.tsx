import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiresponse } from "types/global.types";
import axios from "../../service/Instance";

const Adminlist = () => {
    const [fetchdata, setfetchdata] = useState<apiresponse[]>([]);
    const navigate = useNavigate();

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
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handlenavigation = (id: string) => {
        navigate(
            '/admin/editadmin/admindetails',
            {
                state: { id }
            }
        );
    }

    return (
        <div className="w-full h-72 flex items-center justify-center">
            <table className="table-auto p-2">
                <thead className="border-2 border-black p-2">
                    <tr className="border-2 border-black p-2">
                        <th className="border-2 border-black p-2">S.N.</th>
                        <th className="border-2 border-black p-2">Firstname</th>
                        <th className="border-2 border-black p-2">Middlename</th>
                        <th className="border-2 border-black p-2">Lastname</th>
                        <th className="border-2 border-black p-2">Phone Number</th>
                        <th className="border-2 border-black p-2">Email</th>
                        <th className="border-2 border-black p-2">Role</th>
                        <th className="border-2 border-black p-2">Username</th>
                        <th className="border-2 border-black p-2">Edit</th>
                    </tr>
                </thead>
                <tbody className="border-2 border-black p-2">
                    {fetchdata?.length > 0 && fetchdata.map((item, index) => (
                        <tr key={index} className="border">
                            <td className="border-2 border-black p-2">{index + 1}</td>
                            <td className="border-2 border-black p-2">{item.details.firstName?.en}</td>
                            <td className="border-2 border-black p-2">{item.details.middleName?.en ?? "NULL"}</td>
                            <td className="border-2 border-black p-2">{item.details.lastName?.en}</td>
                            <td className="border-2 border-black p-2">{item.details.phoneNumber ?? "NULL"}</td>
                            <td className="border-2 border-black p-2">{item.email}</td>
                            <td className="border-2 border-black p-2 capitalize">{item.role?.toLowerCase()?.replace("_", " ")}</td>
                            <td className="border-2 border-black p-2">{item.username}</td>
                            <td className="border-2 border-black p-2">
                                <div onClick={() => handlenavigation(item.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-cog text-green-500 cursor-pointer">
                                        <circle cx="18" cy="15" r="3" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                                        <path d="m21.7 16.4-.9-.3" />
                                        <path d="m15.2 13.9-.9-.3" />
                                        <path d="m16.6 18.7.3-.9" />
                                        <path d="m19.1 12.2.3-.9" />
                                        <path d="m19.6 18.7-.4-1" />
                                        <path d="m16.8 12.3-.4-1" />
                                        <path d="m14.3 16.6 1-.4" />
                                        <path d="m20.7 13.8 1-.4" />
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Adminlist;
