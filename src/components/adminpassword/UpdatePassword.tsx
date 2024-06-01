import { SubmitHandler, useForm } from "react-hook-form";
import { updatepasswordtype } from "types/global.types";
import Button from "utils/themes/components/Button";
import InputField from "utils/themes/components/InputField";
import axios from "../../service/Instance";




const UpdatePassword = () => {
    const { register, handleSubmit } = useForm<updatepasswordtype>()

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
            <h1 className="text-3xl font-bold ">Update Password</h1>

            <div className="w-full h-fit max-w-lg bg-[#0000001c] p-4 ">
                <InputField type="password" placeholder="old password " name="oldPassword" register={register} />
                <br />
                <InputField type="password" placeholder="new password " name="newPassword" register={register} />
            </div>
            <Button input="submit" onClick={handleSubmit(onSubmit)} />
        </div>
    )
}

export default UpdatePassword