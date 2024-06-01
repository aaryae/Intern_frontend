
interface headingtype {
    value: string;
}

const Heading = ({ value }: headingtype) => {
    return (
        <>

            <h1 className='uppercase tracking-wide text-gray-700 text-3xl font-bold mb-2 '>{value}</h1>
            <span className=" border-2 border-black w-[50%]"></span>
        </>
    )
}

export default Heading