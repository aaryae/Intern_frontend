import {  useForm } from "react-hook-form";
import axios  from "service/Instance";

interface recoverdata {
    email: string;
    oldPassword: string;
    newPassword: string;
}



const Forgotpassword = () => {
    const form = useForm<recoverdata>();
    const { register, handleSubmit } = form;

    const onSubmit = (data:recoverdata) => {
       axios({
            method: 'patch',
            url: '/auth/update-password',
            data: {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            }
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })

    }



    return (
        <section className=" dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">


                <div className="w-full p-6  rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input
                                type="email"
                                id="email"
                                {
                                ...register("email", {
                                    required: 'email is required',

                                })
                                }
                                className="border  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="youremail@mail.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                            <input
                                type="password"
                                id="password"
                                {
                                ...register("oldPassword", {
                                    required: 'password is required',
                                    minLength: {
                                        value: 4,
                                        message: "Password must be more than 4 characters"
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "Password cannot exceed more than 12 characters"
                                    },
                                })
                                }
                                placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input
                                type="confirm-password"
                                id="confirm-password"
                                {
                                ...register("newPassword", {
                                    required: 'password is required',
                                    minLength: {
                                        value: 4,
                                        message: "Password must be more than 4 characters"
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "Password cannot exceed more than 12 characters"
                                    },
                                })
                                }
                                placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                            </div>
                        </div>
                        <button onClick={handleSubmit(onSubmit)} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Forgotpassword