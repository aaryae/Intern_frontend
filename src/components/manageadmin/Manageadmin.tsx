import Createadmin from "@components/admincreate/Createadmin";
import Adminlist from "@components/adminlist/Adminlist";
import { useState } from "react";
import Button from "utils/themes/components/Button";
import Heading from "utils/themes/components/Heading";

const Manageadmin = () => {
    const [addadmin, setaddadmin] = useState<boolean>(false);

    const handleaddadmin = () => {
        setaddadmin(prevaddadmin => !prevaddadmin);
    };

    const handleAdminCreated = () => {
        setaddadmin(false);
    };

    return (
        <div className="w-full p-4 ">
            <div className="flex justify-between ">
                <Heading value="Manage Admin" />
                <div>
                    <Button onClick={handleaddadmin} input={addadmin ? "Add Admin" : "Create Admin"} />
                </div>
            </div>
            {addadmin ? <Createadmin onAdminCreated={handleAdminCreated} /> : <Adminlist />}
        </div>
    );
};

export default Manageadmin;
