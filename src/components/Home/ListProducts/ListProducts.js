import './ListProducts.css'
import ProductFilter from './ProductFilter/ProductFilter'
import Products from './Products/Products'

const ListProducts = () => {

    return(
        <main className='main-container products--admin'>
            <h1 className='products-title-admin'>Productos</h1>
            <ProductFilter />
            <Products />
        </main>
    )
}


export default ListProducts