/* eslint-disable @typescript-eslint/no-explicit-any */
import Checkbox from "@utils/themes/components/Checkbox";
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
    handleUserUpdate: (updatedUser: apiresponse) => void;
    dialog: () => void;
}

const Editadmin = ({ listdata, admindata, handleUserUpdate, dialog }: getdatatype) => {
    const [state, setstate] = useState<boolean>(true);
    const [handletoggle, sethandletoggle] = useState<boolean>(false);
    const { register, handleSubmit, reset, getValues } = useForm<editUserInterface>({ defaultValues: listdata });

    console.log(handletoggle);

    const handleupdate: SubmitHandler<editUserInterface> = async (data) => {
        try {
            console.log(data);
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
            dialog();
            try {
                const updatedUser = deepMerge({ ...admindata }, data);
                handleUserUpdate(updatedUser);
            } catch (error) {
                console.log(error);
            }
            setstate(prevstate => !prevstate);
        } catch (error) {
            console.log(error);
        }
    };

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
        sethandletoggle(prevhandletoggle => !prevhandletoggle);
    };

    const handlereset = () => {
        const values = getValues();
        reset({
            ...values,
            details: {
                ...values.details,
                firstName: { en: '', ne: values.details?.firstName?.ne },
                lastName: { en: '', ne: values.details?.lastName?.ne },
                phoneNumber: '',
            }
        });
    };

    return (
        <>
            <Heading value="Update form" />
            <form className="w-full mx-auto max-w-lg p-4" onSubmit={handleSubmit(handleupdate)}>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <Label value="firstname" />
                        <InputField readonly={false} register={register} type="text" placeholder="First Name" name={state ? "details.firstName.en" : "firstName.en"} />
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <Label value="lastname" />
                        <InputField readonly={false} register={register} type="text" placeholder="Last Name" name={state ? "details.lastName.en" : "lastName.en"} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3">
                        <Label value="email" />
                        <InputField readonly={true} register={register} type="email" placeholder="Enter Your Email" name="email" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Label value="phonenumber" />
                        <InputField readonly={false} register={register} type="tel" placeholder="" name={state ? "details.phoneNumber" : "phoneNumber"} />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
                <div className="w-full md:w-1/2 pt-3 mb-6 md:mb-0">
                    <Label value="Manage Admin" />
                    <Checkbox register={register} name="allowedFeature"
                        options={[
                            { value: 'MANAGE_ADMIN', label: 'Manage Admin' },
                            { value: 'SETUP', label: 'Setup' },
                        ]}
                    />
                </div>
                <Button
                    input="Update"
                    onClick={() => {
                        handlepopup();
                        handleSubmit(handleupdate)();
                        dialog();
                    }}
                />
            </form>
                <button className="text-red-700 underline pl-6 " type="submit" onClick={handlereset} >reset form</button>
        </>
    );
};

export default Editadmin;
