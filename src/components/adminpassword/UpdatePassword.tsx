import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { updatepasswordtype } from "types/global.types";
import Button from "utils/themes/components/Button";
import Heading from "utils/themes/components/Heading";
import InputField from "utils/themes/components/InputField";
import * as yup from "yup";
import axios from "../../service/Instance";



const updatepasswordschema = yup.object().shape({
    oldPassword: yup.string().required('Password is required')
        .min(8, 'password must be 8 characters')
        .max(16, 'password cannot exceed 16 characters'),
    newPassword: yup.string().required('Password is required')
        .min(8, 'password must be 8 characters')
        .max(16, 'password cannot exceed 16 characters'),

})



const UpdatePassword = () => {



    const { register, handleSubmit, formState: { errors } } = useForm<updatepasswordtype>(
        { resolver: yupResolver(updatepasswordschema) }
    )

    const onSubmit: SubmitHandler<updatepasswordtype> = async (data) => {
        try {
            const response = await axios({
                method: 'patch',
                url: '/auth/update-password',
                data: {
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
                }
            });
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className="w-full flex items-center flex-col gap-10 p-4" >
            <Heading value="Update password" />

            <div className="w-full h-fit max-w-lg bg-[#0000001c] p-4 ">
                <InputField type="password" placeholder="old password " name="oldPassword" register={register} />
                {errors.oldPassword &&
                    <span className="text-red-500 text-sm mt-1">{errors.oldPassword?.message}</span>
                }
                <br />
                <InputField type="password" placeholder="new password " name="newPassword" register={register} />
                {errors.newPassword &&
                    <span className="text-red-500 text-sm mt-1">{errors.newPassword?.message}</span>
                }
            </div>
            <Button input="submit" onClick={handleSubmit(onSubmit)} />
        </div>
    )
}

export default UpdatePassword