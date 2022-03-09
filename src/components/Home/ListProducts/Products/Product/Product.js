//import './Product.css'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {productsUpdateddAction} from '../../../../../redux/action/productsAction'
import {updateFormAction} from '../../../../../redux/action/addProductAction'
import config from '../../../../../config/config'
import axios from 'axios'


const Product = ({value}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const urlImage = `${config.urlServerDb}${value.image}`
    const productsList = useSelector( state => state.products.productsList )

    const updateProduct = (product) => {
        navigate('/admin/addProduct')
        dispatch( updateFormAction(product) )
    }


    const deleteProduct = async (id) => {
        try {
            const urlToDelete = `${config.urlServer}/product/${id}`
            const token = localStorage.getItem('token')
            const response = await axios.delete(urlToDelete, {
                headers: { 
                    Authorization: `Bearer ${token}`
                 }
            })
            const {data} = response
            if (data.err) throw new Error(data.err)
            const NewArray = productsList.filter( (value, index) => {
                if (value.id!=id) {
                    return value
                }
            } )
            dispatch( productsUpdateddAction(NewArray) )
        } catch (error) {
            
        }
    }


    return(
        <div className='product--container'>
            <div className='product--container2'>
            { value.image ? <img className='product--image' src={urlImage} alt='Repuesto' /> : 
            <img className='product--image' src='assets/photo_product_default.png' alt='Imagen Default' /> }
            <p className='product--description' > Codigo:  {value.cod} </p>
            <p className='product--description' > Descripción:  {value.description} </p>
            <p className='product--price' > Precio: {value.price} </p>
            <p className='product--category' > Categoria: {value.categoryId} </p>
            <p className='product--brand' > Marca:  {value.productBrand} </p>
            <button className='product--button' onClick={ () => updateProduct(value) } > Actualizar producto </button>
            <button className='product--button delete-Admin-Button' onClick={ () => deleteProduct(value.id) } > Eliminar producto </button>
            </div>
        </div>
    )
} 


export default Product