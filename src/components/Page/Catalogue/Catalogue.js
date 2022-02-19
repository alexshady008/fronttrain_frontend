import './Catalogue.css'
import Products from './Products/Products'
import ProductFilter from '../../Home/ListProducts/ProductFilter/ProductFilter'
import ListPrices from './ListPrices/ListPrices'


const Catalogue = () => {
    return(
        <main className='main-container'>
            <Products />
            <ProductFilter />
            <ListPrices />
        </main>
    )
}


export default Catalogue