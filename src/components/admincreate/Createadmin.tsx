import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { CreateUserInterface } from "types/global.types"
import Button from "utils/themes/components/Button"
import Heading from "utils/themes/components/Heading"
import InputField from "utils/themes/components/InputField"
import Label from "utils/themes/components/Label"
import SelectInput from "utils/themes/components/SelectInput"
import * as yup from "yup"
import axios from "../../service/Instance"

const createadminschema = yup.object().shape({
    details: yup.object().shape({
        firstName: yup.object().shape({
            en: yup.string().required('First Name is required !'),
            ne: yup.string().notRequired(),
        }),
        lastName: yup.object().shape({
            en: yup.string().required('Last Name is required !'),
            ne: yup.string().notRequired(),
        }),
        phoneNumber: yup.string().required('phonenumber required !')
    }),
    email: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required')
        .min(8, 'password must be 8 characters')
        .max(16, 'password cannot exceed 16 characters')
})

const Createadmin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserInterface>(
        {
            resolver: yupResolver(createadminschema)
        }
    )



    const onSubmit: SubmitHandler<CreateUserInterface> = async (data) => {
        try {
            await axios({
                method: 'post',
                url: '/admin',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
                },
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
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="w-full flex items-center flex-col gap-10">
            <Heading value="Create Admin" />

            <form className="w-full max-w-lg bg-[#0000001c] p-4 ">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                        <Label value="firstname" />
                        <Label value="In english" />
                        <InputField register={register} type="text" placeholder="First Name" name="details.firstName.en" />
                        {errors.details?.firstName?.en &&
                            <span className="text-red-500 text-sm mt-1">{errors.details?.firstName?.en.message}</span>
                        }

                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <br />
                        <Label value="In nepali" />
                        <InputField register={register} type="text" placeholder="पहिलो नाम " name="details.firstName.ne" />


                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                        <Label value="lastname" />
                        <Label value="In english" />
                        <InputField register={register} type="text" placeholder="Last Name" name="details.lastName.en" />
                        {errors.details?.lastName?.en &&
                            <span className="text-red-500 text-sm mt-1">{errors.details?.lastName?.en.message}</span>
                        }

                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <br />
                        <Label value="In nepali" />
                        <InputField register={register} type="text" placeholder="थर " name="details.lastName.ne" />

                    </div>

                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <Label value="email" />
                        <InputField register={register} type="email" placeholder="Enter Your Email" name="email" />
                        {errors.email &&
                            <span className="text-red-500 text-sm mt-1">{errors.email?.message}</span>
                        }

                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <Label value="password" />
                        <InputField register={register} type="password" placeholder="......." name="password" />
                        {errors.password &&
                            <span className="text-red-500 text-sm mt-1">{errors.password?.message}</span>
                        }
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <Label value="phonenumber" />
                        <InputField register={register} type="number" placeholder="" name="details.phoneNumber" />
                        {errors.details?.phoneNumber &&
                            <span className="text-red-500 text-sm mt-1">{errors.details?.phoneNumber?.message}</span>
                        }

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
                <Button input="Submit" onClick={handleSubmit(onSubmit)} />

            </form>
        </div>
    )
}

export default Createadmin