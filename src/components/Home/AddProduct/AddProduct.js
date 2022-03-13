import './AddProduct.css'
import ProductFormAdd from './ProductFormAdd/ProductFormAdd'
import PreviewProductAdd from './PreviewProductAdd/PreviewProductAdd'


const AddProduct = () => {

    return(
        <main className='main-container addProduct--admin'>
            <h1>Agregar Productos</h1>
            <ProductFormAdd />
            <PreviewProductAdd />
        </main>
    )
}


export default AddProduct