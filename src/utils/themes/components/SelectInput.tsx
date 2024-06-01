interface Option {
    value: string;
    label: string;
}
interface SelectInputProps {
    name: string;
    options: Option[];
    placeholder?: string;
}
const SelectInput = ({ name, options }: SelectInputProps) => {
    return (
        <>
            <label htmlFor={name} className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{name}</label>
            <select
                id={name}
                className="block  w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded  text-sm">

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