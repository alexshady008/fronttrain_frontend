import {useDispatch} from 'react-redux'
import {updateQuantityProductAction} from '../../../../redux/action/orderAction'
import { useState } from 'react'


const OrderProduct = ({number, value}) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(value.quantity)

    const subtractQuantity = () => {
        if (quantity > 1){
            const newQuantity = quantity - 1
            setQuantity(newQuantity)
            dispatch( updateQuantityProductAction({id:value.id, quantity:newQuantity}) )
        }
    }

    const addQuantity = () => {
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
        dispatch( updateQuantityProductAction({id:value.id, quantity:newQuantity}) )
    }


    return(
        <div className='order--product-container'>
            <div className='order--product-description' >
                <h3> {number+1} </h3>
                <p> {value.description} </p>
            </div>
            <div className='order--product-price-quantity'>
                <div className='order--product-price'>
                    <h3> Precio: </h3>
                    <p> {value.price * quantity} </p>
                </div>
                <div className='order--product-quantity'>
                    <h3> Cantidad: </h3>
                    <div className='order--product-quantity-buttons'>
                        <button onClick={subtractQuantity} className='quantity-button'> {'<'} </button>
                        <p> {quantity} </p>
                        <button onClick={addQuantity} className='quantity-button'> {'>'} </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default OrderProduct