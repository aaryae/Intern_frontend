
interface secondheadingtype {
    value: string;
}

const Secondheading = ({ value }: secondheadingtype) => {
    return (
        <div className="relative m-4 mt-8 block">
            <h1 className="uppercase tracking-wide text-gray-700 text-sm font-bold underline ">{value}</h1>
            {/* <h1 className="absolute w-[20%] border-2 border-[#374151]  "></h1> */}
        </div>
    )
}

export default Secondheading