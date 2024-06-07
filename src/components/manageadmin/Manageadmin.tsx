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
        <>
            <div className="flex justify-between items-start pl-32">
                <Heading value="Manage Admin" />
                <Button onClick={handleaddadmin} input={addadmin ? "Add Admin" : "Create Admin"} />
            </div>
            {addadmin ? <Createadmin onAdminCreated={handleAdminCreated} /> : <Adminlist />}
        </>
    );
};

export default Manageadmin;
