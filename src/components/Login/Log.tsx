import { toast } from "@components/toast/ToastManager";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import encryptDecrypt from "functions/encryptDecrypt";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { formdata } from "types/global.types";
import axios from "../../service/Instance";

const Log = () => {
    const [showpassword, setshowpassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<formdata>();
    const { encrypt, decrypt } = encryptDecrypt;

    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberMeEmail");
        const savedPassword = localStorage.getItem("rememberMePassword");

        if (savedEmail && savedPassword) {
            setValue("email", decrypt(savedEmail));
            setValue("password", decrypt(savedPassword));
            setRememberMe(true);
        }
    }, [setValue, decrypt]);

    const onSubmit: SubmitHandler<formdata> = async (data) => {
        try {
            const response = await axios({
                method: 'post',
                url: '/auth',
                data: {
                    username: data.email,
                    password: data.password
                }
            });

            const encrypted = encrypt(response.data.data.tokens.accessToken);

            if (response.data.data.admin.role === 'USER') {
                navigate("/user");
            } else {
                navigate('/admin');
            }

            localStorage.setItem("accesstoken", encrypted as string);

            if (rememberMe) {
                localStorage.setItem("rememberMeEmail", encrypt(data.email)as string);
                localStorage.setItem("rememberMePassword", encrypt(data.password) as string);
            } else {
                localStorage.removeItem("rememberMeEmail");
                localStorage.removeItem("rememberMePassword");
            }

            toast.show({ title: "Success", content: "Login successfully", duration: 2000, type: 'success' });
        } catch (error) {
            toast.show({ title: "Error", content: "Login unsuccessfully", duration: 2000, type: 'error' });
            console.error(error);
        }
    };

    const ongoogleSubmit = async (credentialResponse:CredentialResponse) => {
        try {
            const response = await axios({
                method: 'post',
                url: '/auth/google',
                data: {
                    googleId: credentialResponse?.credential
                }
            });

            const encrypted = encrypt(response.data.data.tokens.accessToken);

            if (response.data.data.admin.role === 'USER') {
                navigate("/user");
            } else {
                navigate('/admin');
            }

            localStorage.setItem("accesstoken", encrypted as string);

            toast.show({ title: "Success", content: "Login successfully", duration: 2000, type: 'success' });
        } catch (error) {
            toast.show({ title: "Error", content: "Login unsuccessfully", duration: 2000, type: 'error' });
            console.error(error);
        }
    };


    const handlepasswordshow = () => {
        setshowpassword(prevshowpassword => !prevshowpassword);
    };

  
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
                        className="w-full border-none bg-transparent outline-none focus:outline-none"
                    />
                </div>
                <span className="text-sm text-[#f11111] tracking-wider !mt-3">{errors.email?.message}</span>
                <div className="flex items-center w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
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
                        className="w-full border-none bg-transparent outline-none focus:outline-none"
                    />
                    <button type="button" onClick={handlepasswordshow}>
                        {showpassword ? <Eye /> : <EyeOff />}
                    </button>
                </div>
                <span className="text-sm text-[#f11111] !mt-3">{errors.password?.message}</span>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                </div>
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
                <div className="self-center">
            <GoogleLogin onSuccess={(credentialResponse)=>{
                ongoogleSubmit(credentialResponse)
            }}
            onError={()=>{
                console.log('login failed')
            }}
            />
                    
                </div>
            </section>
        </form>
    );
};

export default Log;
