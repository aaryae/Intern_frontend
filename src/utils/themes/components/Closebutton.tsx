


interface closetype {
    onClick: () => void;
}


const Closebutton = ({ onClick }: closetype) => {

    return (
        <span className="text-red-700 cursor-pointer hover:underline " onClick={onClick}
        >close</span>
    )
}

export default Closebutton