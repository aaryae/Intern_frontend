import Editadmin from "@components/editadmin/Editadmin"
import { useEffect, useState } from "react"
import { apiresponse, editUserInterface } from "types/global.types"
import Closebutton from "utils/themes/components/Closebutton"
import Heading from "utils/themes/components/Heading"
import Label from "utils/themes/components/Label"
import Paragraph from "utils/themes/components/Paragraph"
import axiosInstance from "../../service/Instance"


interface idtype {
    admindata: apiresponse | editUserInterface | null | undefined
    handleUserUpdate: (updatedUser: apiresponse) => void;
    dialog: () => void
}

const Admindetail = ({ admindata, handleUserUpdate, dialog }: idtype) => {
    const [listdata, setlistdata] = useState<apiresponse>()
    const [handletoggle, sethandletoggle] = useState<boolean>(false);



    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axiosInstance({
                    method: 'get',
                    url: `/admin/${admindata?.id}`,
                })
                setlistdata(response.data.data);
                console.log(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
        
    }, [])

    const handlepopup = () => {
        sethandletoggle(prevhandletoggle => !prevhandletoggle)
        
    }
   

    return (
        <>
            <div className="w-full h-[100%] flex flex-col  items-center gap-10 pt-10">
                <Heading value="User Details" />

                <div className="flex flex-col w-full max-w-lg bg-[#0000001c] p-4 h-full   ">
                    <div className="flex">
                        <Label value="Email :" />

                        <Paragraph value={listdata?.email} />
                    </div >
                    <div className="flex">
                        <Label value="Username : " />
                        <Paragraph value={listdata?.username} />

                    </div>
                    <div className="flex">
                        <Label value="Role :" />
                        <Paragraph value={listdata?.role.toLowerCase().replace("_", " ")} />

                    </div>
                    <div className="flex">
                        <Label value="Firstname :" />
                        <Paragraph value={listdata?.details?.firstName.en} />
                    </div>
                    <div className="flex">
                        <Label value="Middlename :" />
                        <Paragraph value={listdata?.details?.middleName?.en ?? "n/a"} />
                    </div>
                    <div className="flex">
                        <Label value="Lastname :" />
                        <Paragraph value={listdata?.details?.lastName.en} />

                    </div>
                    <div className="flex">
                        <Label value="Phonenumber :" />
                        <Paragraph value={listdata?.details?.phoneNumber ?? "NULL"} />

                    </div>

                </div>
                <button onClick={handlepopup} className="bg-green-900 p-3 text-[#e0e0e0] hover:text-white hover:underline px-6">Edit</button>
                {handletoggle && (

                    <div className="fixed flex items-center justify-center bg-black inset-0 bg-opacity-50">
                        <div className="bg-white p-6 rouded-lg shadow-lg w-full max-w-fit">
                            <div className="flex justify-end">
                                <Closebutton onClick={handlepopup} />

                            </div>
                            <Editadmin listdata={listdata} admindata={admindata} handleUserUpdate={handleUserUpdate} dialog={dialog} />
                        </div>
                    </div>
                )}
            </div >




        </>
    )
}

export default Admindetail;