//import './Product.css'
import config from '../../../../../config/config'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addProductAction, deleteProductAction} from '../../../../../redux/action/orderAction'


const Product = ({value}) => {
    const dispatch = useDispatch()
    const orderList = useSelector( state => state.order.productsList )
    const [ordered, setOrdered] = useState(false)
    const urlImage = `${config.urlServerDb}${value.image}`

    const addProductToOrder = (product) => {
        //console.log('Agregar Producto a la orden: ', product)
        setOrdered(true)
        product.quantity=1
        console.log(product)
        dispatch( addProductAction(product) )
    }

    const deleteProductOfOrder = (product) => {
        //console.log('Eliminar Producto de la orden: ', product)
        setOrdered(false)
        dispatch( deleteProductAction(product) )
}
    
    return(
        <div className='product--container'>
            <div className='product--container2'>
            { value.image ? <img className='product--image' src={urlImage} alt='Repuesto' /> : 
            <img className='product--image' src='assets/photo_product_default.png' alt='Imagen Default' /> }
            <p className='product--cod' >Codigo: {value.cod} </p>
            <p className='product--description' > {value.description} </p>
            <p className='product--brand' > {value.productBrand} </p>
            <p className='product--price' > ${value.price} </p>
           
            {/* <p className='product--category' > Categoria: {value.categoryId} </p>
            <p className='product--brand' > Marca:  {value.productBrand} </p>
            <p className='product--car-brand' > Auto:  {value.carBrand} </p>
            <p className='product--car-type' > Tipo:  {value.carType} </p> */}
            { (localStorage.getItem('session')) 
            ?   
                <div> 
                    {   orderList.includes(value) 
                        ?
                        <button className='product--button delete--button' onClick={ () => deleteProductOfOrder(value) } > Eliminar del pedido - </button> 
                        :
                        <button className='product--button add--button' onClick={ () => addProductToOrder(value) } > Agregar al pedido + </button> 
                    }
                </div>
                
            :
                <p className='product--msg' > ¡Debes iniciar sesion para encargar este producto! </p> }
                 </div>
        </div>
    )
}


export default Product