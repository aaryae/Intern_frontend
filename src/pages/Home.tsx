import Boxinfo from "@components/Boxinfo/Boxinfo"
import Navbar from "@components/Navbar/Navbar"
import Cards from "@components/cards/Cards"
import Herosection from "@components/hero/Herosection"
import Sliderinfo from "@components/sliderinfo/Sliderinfo"
import { image } from "@config/constant/Image"

const Home = () => {
    return (
        <>
            <div style={{ backgroundImage: `url(${image?.mainbg})` }} className='bg-cover bg-no-repeat'>
                <Navbar />
                <Herosection />
            </div>
            <Boxinfo />
            <Sliderinfo />
            <Cards />

        </>
    )
}

export default Home