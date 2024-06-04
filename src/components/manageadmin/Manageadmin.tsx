import Createadmin from "@components/admincreate/Createadmin";
import Adminlist from "@components/adminlistui/Adminlist";
import { useState } from "react";
import Button from "utils/themes/components/Button";
import Heading from "utils/themes/components/Heading";

const Manageadmin = () => {
    const [addadmin, setaddadmin] = useState<boolean>(false);

    const handleaddadmin = () => {
        setaddadmin(prevaddadmin => !prevaddadmin);
    }

    return (
        <div className="w-full">
            <div className=" flex justify-between items-start  pl-32 ">

                <Heading value="manage admin" />



                <Button onClick={handleaddadmin} input={addadmin ? "add admin" : "create admin"} />


            </div>
            {addadmin && addadmin ? <Createadmin /> : <Adminlist />}

        </div>


    )
}

export default Manageadmin