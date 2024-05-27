import { image } from "@config/constant/Image"

const Herosection = () => {
    return (
        <>

            <div className="max-w-7xl mx-auto bg-no-repeat bg-bottom " style={{ backgroundImage: `url(${image?.mainbg2})` }}>
                <div className="flex flex-wrap p-3 py-24 justify-center  items-center md:py-52 md:justify-between">

                    <div className=" md:w-1/2  ">
                        <h1 className="text-4xl font-bold my-4 text-[#e0e4ee] ">
                            This is the Blogging Website
                        </h1>
                        <p className="text-lg my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. In magni mollitia id, quaerat magnam suscipit vel. Ducimus, labore reprehenderit, sit expedita itaque aut placeat unde voluptatum vero recusandae fugiat molestias.</p>
                        <button className="py-3 px-8 bg-[#ff6492] text-white">Get Start Now</button>
                    </div>

                    <div className=" w-72">

                        <img src={image.heroimg1} alt="img" className=" bg-cover  w-full h-full" />
                    </div>

                </div>
            </div>

        </>

    )
}

export default Herosection