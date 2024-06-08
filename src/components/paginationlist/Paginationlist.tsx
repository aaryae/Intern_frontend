
interface paginationtype {
    totalPages?: number,
    updatepaginationlist: (paginationnumber: number) => void;
}


const Paginationlist = ({ totalPages = 1, updatepaginationlist }: paginationtype) => {


    const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);


    const handlelist = (value: number) => {
        updatepaginationlist(value)
    }


    return (
        <div>
            {numbers.map((value, index) => (
                <span onClick={
                    () =>
                        handlelist(value)
                } className="px-2 cursor-pointer" key={index}>{value}</span>
            ))
            }
        </div >
    )
}

export default Paginationlist