import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { apiresponse, editUserInterface } from "types/global.types";
import Button from "utils/themes/components/Button";
import Heading from "utils/themes/components/Heading";
import InputField from "utils/themes/components/InputField";
import Label from "utils/themes/components/Label";
import SelectInput from "utils/themes/components/SelectInput";
import axiosInstance from "../../service/Instance";

interface getdatatype {
    listdata: apiresponse | undefined;
    admindata: apiresponse | editUserInterface | null | undefined;
    admindatafunction: (updatedUser: apiresponse) => void
    dialog: () => void
}

const Editadmin = ({ listdata, admindata, admindatafunction, dialog }: getdatatype) => {
    const [state, setstate] = useState<boolean>(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [handletoggle, sethandletoggle] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<editUserInterface>({ defaultValues: listdata });



    const handleupdate: SubmitHandler<editUserInterface> = async (data) => {
        try {
            await axiosInstance({
                method: 'patch',
                url: '/admin',
                data: {
                    id: admindata?.id,
                    role: data.role,
                    allowedFeature: data.allowedFeature,
                    firstName: {
                        en: data.details?.firstName?.en,
                        ne: data.details?.firstName?.ne
                    },
                    lastName: {
                        en: data.details?.lastName?.en,
                        ne: data.details?.lastName?.ne
                    },
                    phoneNumber: data.details?.phoneNumber,
                }
            });

            try {
                const updatedUser = deepMerge({ ...admindata }, data)
                admindatafunction(updatedUser)

            } catch (error) {
                console.log(error)
            }
            setstate(prevstate => !prevstate);
        } catch (error) {
            console.log(error);
        }
    }; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deepMerge = (target: any, source: any): any => {
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object') {
                if (!target[key]) {
                    target[key] = {};
                }
                deepMerge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
        return target;
    };

    const handlepopup = () => {
        sethandletoggle(prevhandletoggle => !prevhandletoggle)
    }
    return (
        <>
            <Heading value="Update form" />
            <form className="w-full mx-auto max-w-lg p-4 ">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <Label value="firstname" />
                        <InputField readonly={false} register={register} type="text" placeholder="First Name" name={state ? "details.firstName.en" : "firstName.en"} />
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <Label value="lastname" />
                        <InputField readonly={false} register={register} type="text" placeholder="Last Name" name={state ? "details.lastName.en" : "lastName.en"} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <Label value="email" />
                        <InputField readonly={true} register={register} type="email" placeholder="Enter Your Email" name="email" />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <Label value="phonenumber" />
                        <InputField readonly={false} register={register} type="tel" placeholder="" name={state ? "details.phoneNumber" : "phoneNumber"} />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <div className="relative">
                            <Label value="Manage Admin" />
                            <SelectInput
                                name="allowedFeatures"
                                register={register}
                                options={[
                                    { value: 'MANAGE_ADMIN', label: 'manage admin' },
                                    { value: 'SETUP', label: 'SETUP' },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <div className="relative">
                            <Label value="roles" />
                            <SelectInput
                                register={register}
                                name="role"
                                options={[
                                    { value: 'ADMIN', label: "admin" },
                                    { value: 'SUPER_ADMIN', label: "super admin" },
                                    { value: 'SUDO_ADMIN', label: "sudo admin" },
                                    { value: 'USER', label: "User" },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div onClick={handlepopup}>

                    <Button
                        input="Update"
                        onClick={() => {
                            handleSubmit(handleupdate)();
                            dialog();
                        }}
                    />

                </div>
            </form>
        </>
    );
};

export default Editadmin;
