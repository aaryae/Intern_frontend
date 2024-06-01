import { SubmitHandler, useForm } from "react-hook-form"
import { CreateUserInterface } from "types/global.types"
import Button from "utils/themes/components/Button"
import InputField from "utils/themes/components/InputField"
import SelectInput from "utils/themes/components/SelectInput"
import axios from "../../service/Instance"


const Createadmin = () => {
    const { register, handleSubmit } = useForm<CreateUserInterface>()

    const onSubmit: SubmitHandler<CreateUserInterface> = async (data) => {
        try {
            await axios({
                method:'post',
                url:'/admin',
                data:{
                    
                }
            })

        }
        catch (error) {
            console.log(error)
        }
    }




    return (
        <div className="w-full flex items-center flex-col gap-10">
            <h1 className="text-3xl font-bold">Create Admin</h1>

            <form className="w-full max-w-lg bg-[#0000001c] p-4 ">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <InputField register={register} type="text" placeholder="firstname" name="firstname" />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <InputField register={register} type="text" placeholder="lastname" name="lastname" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <InputField register={register} type="email" placeholder="enter you email" name="email" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <InputField register={register} type="password" placeholder="......." name="password" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <InputField register={register} type="number" placeholder="" name="phonenumber" />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <div className="relative">
                            <SelectInput
                                name="manage Admin"
                                options={[
                                    { value: 'manageadmin', label: 'Manage Admin' },

                                ]}
                            />

                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <div className="relative">
                            <SelectInput
                                name="Roles"
                                options={[
                                    { value: 'admin', label: "admin" },
                                    { value: 'super admin', label: " super admin" },
                                    { value: 'sudo admin', label: " sudo admin" },
                                    { value: 'User', label: "User" },
                                ]}
                            />
                        </div>
                    </div>


                </div>
            </form>
            <Button input="Submit" onClick={handleSubmit(onSubmit)} />
        </div>
    )
}

export default Createadmin