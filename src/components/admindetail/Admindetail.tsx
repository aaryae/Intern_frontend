import Editadmin from "@components/editadmin/Editadmin"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { apiresponse } from "types/global.types"
import Heading from "utils/themes/components/Heading"
import Label from "utils/themes/components/Label"
import Paragraph from "utils/themes/components/Paragraph"
import axiosInstance from "../../service/Instance"

const Admindetail = () => {
    const [listdata, setlistdata] = useState<apiresponse>()
    const [handletoggle, sethandletoggle] = useState<boolean>(false);
    const location = useLocation();
    const { id } = location.state;


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axiosInstance({
                    method: 'get',
                    url: `/admin/${id}`,
                })
                setlistdata(response.data.data);
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

                    {/* <Label value="Middlename :" /> */}

                </div>
                <button onClick={handlepopup} className="bg-green-900 p-3 text-[#e0e0e0] hover:text-white hover:underline px-6">Edit</button>
                {handletoggle && (
                    <div className="bg-white absolute  top-52 text-center w-1/2  shadow-2xl rounded">
                        <button onClick={handlepopup} className="text-red-800 p-3  float-right text-bold hover:underline ">close</button>
                        <Editadmin listdata={listdata} />
                    </div>
                )}
            </div>




        </>
    )
}

export default Admindetail;