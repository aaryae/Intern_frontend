import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { apiresponse } from "types/global.types"
import Heading from "utils/themes/components/Heading"
import Label from "utils/themes/components/Label"
import Paragraph from "utils/themes/components/Paragraph"
import axios from "../../service/Instance"

const Admindetail = () => {
    const [listdata, setlistdata] = useState<apiresponse>()
    const location = useLocation();
    const { id } = location.state;


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: `/admin/${id}`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
                    }
                })
                setlistdata(response.data.data);
                console.log(response.data.data)



            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])



    return (
        <>

            <div className="w-full h-[100%] flex flex-col justify-center items-center gap-10 pt-60">
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
                        <Paragraph value={listdata?.role.toLowerCase()} />

                    </div>
                    <div className="flex">

                        <Label value="Firstname :" />
                        <Paragraph value={listdata?.details?.firstName.en} />
                    </div>
                    <div className="flex">

                        <Label value="Lastname :" />
                        <Paragraph value={listdata?.details?.lastName.en} />

                    </div>
                    <div className="flex">
                        <Label value="Phonenumber :" />
                        <Paragraph value={listdata?.details?.phoneNumber} />

                    </div>

                    {/* <Label value="Middlename :" /> */}

                </div>
            </div>




        </>
    )
}

export default Admindetail;