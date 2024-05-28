import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../service/Instance";

interface formdata {
    email: string;
    password: string;
}



const Log = () => {
    const form = useForm<formdata>();
    const navigate = useNavigate();
    const { register, handleSubmit, formState:{errors} } = form;





    const onSubmit: SubmitHandler<formdata> = (data) => {


        api({
            method: 'post',
            url: '/auth',
            data: {
                username: data.email,
                password: data.password
            }
        }).then((response) => {
            navigate('/admindashboardui');
            console.log(response);
        })
            .catch(error => console.log(error));
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
            <section className="flex w-[30rem] flex-col space-y-10">
                <div className="text-center text-4xl font-medium">Log In</div>
                <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                    <input
                        {...register("email", {
                            required: 'email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: 'invalid email format'
                            }
                        })}

                        autoComplete="on"
                        type="text"
                        placeholder="Email or Username"
                        className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                    />
                </div>
                <span className="text-sm text-red-900">{errors.email?.message}</span>

                <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                    <input
                        {...register("password", {
                            required: 'password is required '
                        })}
                        type="password"
                        placeholder="Password"
                        className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                    />
                </div>
                <span className="text-sm text-red-900">{errors.password?.message}</span>

                <button
                    type="submit"
                    className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
                >
                    LOG IN
                </button>
                <a href="#" className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300">FORGOT PASSWORD?</a>
                <p className="text-center text-lg">
                    No account?
                    <a href="#" className="font-medium text-indigo-500 underline-offset-4 hover:underline">Create One</a>
                </p>
            </section>
        </form>
    );
}

export default Log;
