import './ListProducts.css'
import ProductFilter from './ProductFilter/ProductFilter'
import Products from './Products/Products'

const ListProducts = () => {

    return(
        <main className='main-container  listProducts--container'>
            <h1 >Productos</h1>
            <ProductFilter />
            <Products />
        </main>
    )
}


export default ListProducts