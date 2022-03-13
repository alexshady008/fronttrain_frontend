import {useDispatch} from 'react-redux'
import {updateQuantityProductAction} from '../../../../redux/action/orderAction'
import { useState } from 'react'


const OrderProduct = ({number, value, setquantityChanged}) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(value.quantity)

    const subtractQuantity = () => {
        if (quantity > 1){
            const newQuantity = quantity - 1
            setQuantity(newQuantity)
            setquantityChanged()
            dispatch( updateQuantityProductAction({id:value.id, quantity:newQuantity}) )
        }
    }

    const addQuantity = () => {
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
        setquantityChanged()
        dispatch( updateQuantityProductAction({id:value.id, quantity:newQuantity}) )
    }


    return(
        <div className='order--product-container'>
            <div className='order--product-cod' >
                <h3 className='order--product-h3'> Código: </h3>
                <p> {value.cod} </p>
            </div>
            <div className='order--product-brand' >
                <h3 className='order--product-h3'> Marca: </h3>
                <p> {value.productBrand} </p>
            </div>
            <div className='order--product-price' >
                <h3 className='order--product-h3'> Precio: </h3>
                <p> ${value.price} </p>
            </div>
            <div className='order--product-quantity'>
                 <h3 className='order--product-h3'> Cantidad: </h3>
                    <div className='order--product-quantity-buttons'>
                        <button onClick={subtractQuantity} className='quantity-button'> {'<'} </button>
                        <p> {quantity} </p>
                        <button onClick={addQuantity} className='quantity-button'> {'>'} </button>
                    </div>
            </div>
        </div>
    )
}


export default OrderProduct