import { UseFormRegister } from "react-hook-form";

interface SelectInputProps {
    name: string;
    options: {
        value: string;
        label: string;
    }[]
    placeholder?: string;
    register: UseFormRegister<any>
}
const SelectInput = ({ name, options, register }: SelectInputProps) => {
    return (
        <>
            <select
                id={name}
                className="block  w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded  text-sm"
                {...register(name)}
            >

                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    );
};

export default SelectInput;