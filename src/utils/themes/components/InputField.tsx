import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { InputProps } from "types/input.types";

const InputField = ({ type = 'text', register, placeholder, name }: InputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handlePasswordShow = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className="relative">
            <input
                type={inputType}
                id={name}
                placeholder={placeholder}
                {...register(name)}
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white `}
            />


            {type === 'password' && (
                <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={handlePasswordShow}
                >
                    {showPassword ? <Eye /> : <EyeOff />}
                </div>
            )}
        </div>
    );
};

export default InputField;
