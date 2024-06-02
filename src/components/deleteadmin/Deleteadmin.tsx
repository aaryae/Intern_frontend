import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../service/Instance";

const Deleteadmin = () => {
    const location = useLocation()
    const { id } = location.state;

    useEffect(() => {
        const deletedata = async () => {
            try {
                await axios({
                    method: 'delete',
                    url: '/admin',
                    headers: {
                        authorization: `bearer ${localStorage.getItem("accesstoken")}`
                    },
                    data: id
                })
            } catch (error) {
                console.log(error)
            }
        }

        deletedata();
    }, [])


    return null;
}

export default Deleteadmin