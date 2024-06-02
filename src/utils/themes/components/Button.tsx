
interface buttontype {
    input: string
    onClick: () => void;
}

const Button = ({ input, onClick }: buttontype) => {



    return (
        <button className="bg-black text-white p-3 m-3 px-5 border border-black hover:text-[#ffffff8f] hover:border-black transition-colors tracking-wide" onClick={onClick}>{input}


        </button>
    )
}

export default Button