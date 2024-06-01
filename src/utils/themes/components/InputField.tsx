import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { InputProps } from "types/input.types";

const InputField = ({ type, register, placeholder, name }: InputProps) => {
    const [showpassword, setshowpassword] = useState<boolean>(false);

    const handlepasswordshow = () => {
        setshowpassword((prevshowpassword) => !prevshowpassword);
    };

    const inputType = type === 'password' && showpassword ? 'text' : type;

    return (
        <div className="relative">
            <label htmlFor={name} className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                {name}
            </label>
            <input
                type={inputType}
                id={name}
                placeholder={placeholder}
                {...register(name)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            {type === 'password' && (
                <div
                    className="absolute inset-y-0 right-0  mt-[22px] pr-3 flex items-center cursor-pointer"
                    onClick={handlepasswordshow}
                >
                    {showpassword ? <Eye /> : <EyeOff />}
                </div>
            )}
        </div>
    );
};

export default InputField;
