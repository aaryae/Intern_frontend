import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../service/Instance";

interface formdata {
    email: string;
    password: string;
}



const Log = () => {
    const [showpassword, setshowpassword] = useState<boolean>(false);
    const [errormessage, seterrormessage] = useState<string | null>('')
    // const [timetracker, settimetracker] = useState<boolean>(true);
    const [errorvalue, seterrorvalue] = useState<boolean>(false)
    const form = useForm<formdata>();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = form;


    const onSubmit: SubmitHandler<formdata> = (data) => {
        axios({
            method: 'post',
            url: '/auth',
            headers: {
                Authorization: `Bearer `,
            },
            data: {
                username: data.email,
                password: data.password
            }
        }).then((response) => {
            console.log(response)
            localStorage.setItem("token", response.data.data.tokens.accessToken);
            navigate('/admin');


        })
            .catch((error) => {
                seterrormessage(error.response.data.message)
                seterrorvalue(true),
                console.log(error)
            }
            );
    }

    const handlepasswordshow = () => {
        setshowpassword(prevshowpassword => !prevshowpassword);

    }

    // useEffect(() => {
    //     const displayerror = () => {
    //         const handler = setTimeout(() => {
    //             settimetracker(true);
    //             // return (
    //             //     clearTimeout(handler)
    //             // )


    //         }, 2000);
    //     }
    //     displayerror();
    // })

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
                <span className="text-sm text-[#f11111] tracking-wider !mt-3">{errors.email?.message}</span>

                <div className=" flex -between w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                    <input
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 4,
                                message: "Password must be more than 4 characters"
                            },
                            maxLength: {
                                value: 12,
                                message: "Password cannot exceed more than 12 characters"
                            },

                        })}

                        type={showpassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                    />
                    <button onClick={handlepasswordshow} >
                        {showpassword ? <Eye /> : <EyeOff />}
                    </button>
                </div>
                <span className="text-sm text-[#f11111] !mt-3" >{errors.password?.message}</span>

                <button
                    type="submit"
                    className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
                >
                    LOG IN
                </button>
                <a href="/forgotpassword" className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300">FORGOT PASSWORD?</a>
                <p className="text-center text-lg">
                    No account?
                    <a href="#" className="font-medium text-indigo-500 underline-offset-4 hover:underline">Create One</a>
                </p>
                {errorvalue && (
                    <div className=" text-[#f11111]" text-xl text-center>{errormessage}</div>
                )}
            </section>
        </form>
    );
}

export default Log;
