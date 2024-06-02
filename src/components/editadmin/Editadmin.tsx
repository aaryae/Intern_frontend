import { SubmitHandler, useForm } from "react-hook-form";
import { CreateUserInterface, apiresponse } from "types/global.types";
import Button from "utils/themes/components/Button";
import Heading from "utils/themes/components/Heading";
import InputField from "utils/themes/components/InputField";
import Label from "utils/themes/components/Label";
import SelectInput from "utils/themes/components/SelectInput";
import axios from "../../service/Instance";

interface getdatatype {
    listdata: apiresponse;
}

const Editadmin = ({ listdata }: getdatatype) => {
    const { register, handleSubmit } = useForm<CreateUserInterface>({ defaultValues: listdata });


    const handleupdate: SubmitHandler<CreateUserInterface> = async () => {
        try {
            await axios({
                method: 'patch',
                url: '/admin',
                headers: {
                    Authorization: `Bearer : ${localStorage.getItem("accesstoken")}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }





    return (
        <>
            <Heading value="Update form" />
            <form className="w-full mx-auto max-w-lg  p-4 ">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full  px-3 mb-6 md:mb-0">

                        <Label value="firstname" />

                        <InputField register={register} type="text" placeholder="" name="details.firstName.en" />

                    </div>

                    <div className="w-full  px-3 mb-6 md:mb-0">

                        <Label value="lastname" />
                        <InputField register={register} type="text" placeholder="Last Name" name="details.lastName.en" />

                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <Label value="email" />
                        <InputField register={register} type="email" placeholder="Enter Your Email" name="email" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <Label value="password" />
                        <InputField register={register} type="password" placeholder="......." name="password" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <Label value="phonenumber" />
                        <InputField register={register} type="number" placeholder="" name="details.phoneNumber" />
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
                                    { value: 'SUPER_ADMIN', label: " super admin" },
                                    { value: 'SUDO_ADMIN', label: " sudo admin" },
                                    { value: 'USER', label: "User" },
                                ]}
                            />
                        </div>
                    </div>


                </div>

            </form>
            <Button input="Update" onClick={handleSubmit(handleupdate)} />
        </>
    )
}

export default Editadmin