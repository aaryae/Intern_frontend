import Admindetail from "@components/admindetail/Admindetail";
import { useEffect, useState } from "react";
import { apiresponse } from "types/global.types";
import Heading from "utils/themes/components/Heading";
import { default as axios, default as axiosInstance } from "../../service/Instance";

const Adminlist = () => {
    const [fetchdata, setfetchdata] = useState<apiresponse[]>([]);
    const [adminid, setadminid] = useState<string>('');
    const [popup, setpopup] = useState<boolean>(false)


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




    const handledelete = (id?: string) => {
        const deletedata = async () => {
            try {
                await axiosInstance({
                    method: 'delete',
                    url: `/admin/${id}`,

                    data: { id }
                });

                setfetchdata(prevData => prevData.filter(item => item.id !== id));
            }
            catch (error) {
                console.error(error);
            }
        };

        deletedata();
    }


    const handlepopup = (id: string | null) => {
        setadminid(id);
        setpopup(prevpopup => !prevpopup)
    }


    return (
        <div className="w-full h-72 flex  flex-col items-center justify-center mt-32">
            <Heading value="Admin List" />
            <table className="table-auto p-2 m-4">
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
                        <th className="border-2 border-black p-2">Detail</th>
                        {/* <th className="border-2 border-black p-2">Edit</th> */}
                        <th className="border-2 border-black p-2">Delete</th>
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
                                <p onClick={
                                    () => {
                                        handlepopup(item.id)
                                    }
                                } className="underline cursor-pointer text-blue-600 hover:text-red-700">view</p>

                            </td>
                            <td className="border-2 border-black p-2">
                                <div onClick={() => handledelete(item?.id)}>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash text-red-800 flex items-center w-full cursor-pointer"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {popup && (
                <div className="fixed flex items-center justify-center bg-black inset-0 bg-opacity-50">
                    <div className="bg-white p-6 rouded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-end">
                            <span className="text-red-700 cursor-pointer hover:underline " onClick={() => {
                                handlepopup(null)
                            }}>close</span>
                        </div>
                        <Admindetail id={adminid} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Adminlist;
