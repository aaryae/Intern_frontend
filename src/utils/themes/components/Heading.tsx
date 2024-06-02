
interface headingtype {
    value: string;
}

const Heading = ({ value }: headingtype) => {
    return (
        <>

            <div className="relative m-4 mt-8">
                <h1 className="uppercase tracking-wide text-gray-700 text-3xl font-bold mb-2">{value}</h1>
                <h1 className="absolute w-[50%] border-2 border-[#374151] left-1/2 transform -translate-x-1/2"></h1>
            </div>

        </>
    )
}

export default Heading