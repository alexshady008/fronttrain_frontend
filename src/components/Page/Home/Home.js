import './Home.css'
import CoverPage from './CoverPage/CoverPage'
import Categories from './Categories/Categories'
import Banner from './Banner/Banner'
import Description from './Description/Description'
import Testimonials from './Testimonials/Testimonials'
import Brands from './Brands/Brands'
import Suscription from './Suscription/Suscription'


const Home = () => {

    return(
        <main className='main-container'>
            <CoverPage 
                title='¡Encontrá tus respuestos de tren delantero!'
                buttonText='¡Encargar repuestos!' />
            <Categories />
            <Banner title='¡En Front Train tenemos una amplia variedad de repuestos!' />
            <Description />
            <Testimonials />
            <Brands />
            <Suscription />
        </main>
    )
}


export default Home