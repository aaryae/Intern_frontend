interface labeltype {
    value: string;
    required?: boolean;
}

const Label = ({ value, required = false }: labeltype) => {
    return (
        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold flex items-center m-2" htmlFor={value}>
            {value} {required && <span className="text-red-500">*</span>}
        </label>
    )
}

export default Label
