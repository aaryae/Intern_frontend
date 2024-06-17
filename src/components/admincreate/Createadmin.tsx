import { toast } from "@components/toast/ToastManager"
import Uploadmedia from "@components/uploadmedia/Uploadmedia"
import { yupResolver } from "@hookform/resolvers/yup"
import Checkbox from "@utils/themes/components/Checkbox"
import { SubmitHandler, useForm } from "react-hook-form"
import { CreateUserInterface } from "types/global.types"
import Button from "utils/themes/components/Button"
import Heading from "utils/themes/components/Heading"
import InputField from "utils/themes/components/InputField"
import Label from "utils/themes/components/Label"
import SelectInput from "utils/themes/components/SelectInput"
import * as yup from "yup"
import axiosInstance from "../../service/Instance"



const createadminschema = yup.object().shape({
    details: yup.object().shape({
        firstName: yup.object().shape({
            en: yup.string().required('First Name is required !'),
            ne: yup.string().optional(),
        }),
        lastName: yup.object().shape({
            en: yup.string().required('Last Name is required !'),
            ne: yup.string().optional(),
        }),
        phoneNumber: yup.string().required('phone number required !')
        .min(10,'phone number less than 10 digits')
        .max(10, "phone number more than 10 digits")
    }),
    email: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required')
        .min(8, 'password must be 8 characters')
        .max(16, 'password cannot exceed 16 characters')

})

interface navigatetolisttype {
    onAdminCreated: () => void
}

const Createadmin = ({ onAdminCreated }: navigatetolisttype) => {
    const { register, handleSubmit, formState: { errors } ,reset} = useForm<CreateUserInterface>(
        {
            resolver: yupResolver(createadminschema)
        }
    )

    const onSubmit: SubmitHandler<CreateUserInterface> = async (data) => {
        try {
            console.log(data)
            await axiosInstance({
                method: 'post',
                url: '/admin',

                data: {
                    email: data.email,
                    password: data.password,
                    role: data.role,
                    allowedFeature: data.allowedFeature,
                    details: {
                        firstName: {
                            en: data.details?.firstName.en,
                            ne: data.details?.firstName.ne
                        },
                        lastName: {
                            en: data.details?.lastName.en,
                            ne: data.details?.lastName.ne
                        },
                        phoneNumber: data.details?.phoneNumber
                    }
                }
            });
            toast.show({ title: "Success", content: "Updated successfully", duration: 2000, type: 'success' });
            onAdminCreated();
            console.log(data)

        } catch (error) {
            toast.show({ title: "Error", content: "unsuccessfully", duration: 2000, type: 'error' });
            console.log(error);
        }
    }


    return (
        <div className="w-full flex items-center flex-col gap-10 ">
            <Heading value="Create Admin" />

            <form className="w-full max-w-lg bg-[#0000001c] p-4 ">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                        <Label value="firstname"  />
                        <Label value="In english" required={true} />
                        <InputField readonly={false} register={register} type="text" placeholder="First Name" name="details.firstName.en" />
                        {errors.details?.firstName?.en &&
                            <span className="text-red-500 text-sm mt-1">{errors.details?.firstName?.en.message}</span>
                        }

                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <br />
                        <Label value="In nepali" />
                        <InputField readonly={false} register={register} type="text" placeholder="पहिलो नाम " name="details.firstName.ne" />


                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                        <Label value="lastname" />
                        <Label value="In english" required={true} />
                        <InputField readonly={false} register={register} type="text" placeholder="Last Name" name="details.lastName.en" />
                        {errors.details?.lastName?.en &&
                            <span className="text-red-500 text-sm mt-1">{errors.details?.lastName?.en.message}</span>
                        }

                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <br />
                        <Label value="In nepali" />
                        <InputField readonly={false} register={register} type="text" placeholder="थर " name="details.lastName.ne" />

                    </div>

                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <Label value="email" required={true} />
                        <InputField readonly={false} register={register} type="email" placeholder="Enter Your Email" name="email" />
                        {errors.email &&
                            <span className="text-red-500 text-sm mt-1">{errors.email?.message}</span>
                        }

                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <Label value="password" required={true}/>
                        <InputField readonly={false} register={register} type="password" placeholder="......." name="password" />
                        {errors.password &&
                            <span className="text-red-500 text-sm mt-1">{errors.password?.message}</span>
                        }
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Label value="phonenumber" required={true}/>
                        <InputField readonly={false} register={register} type="number" placeholder="" name="details.phoneNumber" />
                        {errors.details?.phoneNumber &&
                            <span className="text-red-500 text-sm mt-1">{errors.details?.phoneNumber?.message}</span>
                        }

                    </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <div className="relative"> 
                                    <Label value="roles" required={true}/>
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
                    <div className="w-full md:w-1/2 pt-3 mb-6 mt-2 md:mb-0 ">
                        <div className="">
                            <Label value="Manage Admin" required={true}/>
                           
                            <Checkbox register={register} name="allowedFeature" 
                             options={[
                                { value: 'MANAGE_ADMIN', label: 'Manage Admin' },
                                { value: 'SETUP', label: 'Setup' },
                            ]}
                            />
                        </div>
                    </div>
                   
                <Button type="submit" input="Submit" onClick={handleSubmit(onSubmit)} />
                <br />
                <button onClick={()=>reset()} className="text-red-500 underline hover:rext-red-800 pl-3 " >reset</button>   
            </form>
            <Uploadmedia/>
            
        </div>
    )
}

export default Createadmin