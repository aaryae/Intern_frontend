
interface paragraphtype {
    value?: string;
}

const Paragraph = ({ value }: paragraphtype) => {
    return (
        <p className='flex items-center text-[#6b7280]'>{value}</p>
    )
}

export default Paragraph