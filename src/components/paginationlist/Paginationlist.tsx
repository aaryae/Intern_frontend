import { MoveLeft, MoveRight } from "lucide-react";
import { useState } from "react";

interface paginationtype {
    totalPages?: number,
    updatepaginationlist: (paginationnumber: number) => void;
}

const Paginationlist = ({ totalPages = 1, updatepaginationlist }: paginationtype) => {
    const [activePage, setActivePage] = useState(1);

    const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlelist = (value: number) => {
        setActivePage(value);
        updatepaginationlist(value);
    }

    const handlemoveleft=()=>{

        setActivePage(prevActivePage=>prevActivePage-1)
        updatepaginationlist(activePage)

    }

    const handlemoveright=()=>{
        setActivePage(prevActivePage=>prevActivePage+1)
        updatepaginationlist(activePage)

    }

    return (
        <div className="flex gap-2">
            <MoveLeft  onClick={handlemoveleft} />
            {numbers.map((value, index) => (
                <span
                    onClick={() => handlelist(value)}
                    className={`px-2 cursor-pointer ${value === activePage ? 'text-red-600 underline' : ''}`}
                    key={index}
                >
                    {value}
                </span>
            ))}
            <MoveRight onClick={handlemoveright}/>
        </div>
    )
}

export default Paginationlist;


