
const Adminlist = () => {
    return (
        <div className="w-full h-72 flex items-center justify-center">

            <table className="table-auto p-2">
                <thead className="border-2 border-black p-2" >
                    <tr className="border-2 border-black p-2"  >
                        <th className="border-2 border-black p-2" >Song</th>
                        <th className="border-2 border-black p-2" >Artist</th>
                        <th className="border-2 border-black p-2" >Year</th>
                    </tr>
                </thead>
                <tbody className="border-2 border-black p-2" >
                    <tr className="border">
                        <td className="border-2 border-black p-2" >The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                        <td className="border-2 border-black p-2" >Malcolm Lockyer</td>
                        <td className="border-2 border-black p-2" >1961</td>
                    </tr>
                    <tr className="border-2 border-black p-2" >
                        <td className="border-2 border-black p-2" >Witchy Woman</td>
                        <td className="border-2 border-black p-2" >The Eagles</td>
                        <td className="border-2 border-black p-2" >1972</td>
                    </tr>
                    <tr className="border-2 border-black p-2" >
                        <td className="border-2 border-black p-2" >Shining Star</td>
                        <td className="border-2 border-black p-2" >Earth, Wind, and Fire</td>
                        <td className="border-2 border-black p-2" >1975</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Adminlist