
interface labeltype {
    value: string;
}

const Label = ({ value }: labeltype) => {
    return (
        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold flex items-center m-2" htmlFor={value}>{value}</label>
    )
}

export default Label