import './Order.css'
import {useSelector, useDispatch} from 'react-redux'
import {deleteProductAction} from '../../../redux/action/orderAction'
import OrderProduct from './OrderProduct/OrderProduct'
import { useState } from 'react'
import config from '../../../config/config'

const returnRedirectToWhatsapp = () => {
    return `https://api.whatsapp.com/send/?phone=${config.numberAdmin}&text=Hola%2C+me+gustaria+encargar+el+siguiente+pedido:`
}

const Order = () => {
    const redirectToWhatsapp= returnRedirectToWhatsapp()
    const [deleted, setDeleted] = useState(0)
    const dispatch = useDispatch()
    const orderList = useSelector( state => state.order.productsList )
    const orderProducts = useSelector( state => state.order.orderProducts )
    
    const deleteProduct = (product) => {
        setDeleted(deleted+1)
        dispatch( deleteProductAction(product) )
    }

    const sendOrderByEmail = () => {

    }

    return(
        <main className='main--container'>
            <h1> Tu orden </h1>
            <section className='section--container order'>
                { orderProducts ? <h2> Estado de tu orden: ENVIADO </h2> : <h2> Estado de tu orden: NO ENVIADO </h2> }
                <div className='order--container inner--container'>
                    <div className='order--products' >
                        { orderList.map( (orderProduct, index) => 
                        <div key={index} className='order--product-details'>
                            <OrderProduct number={index} value={orderProduct} />
                            <div className='order--product-delete' >
                                <button onClick={() => deleteProduct(orderProduct) }
                                className='delete--button' > Eliminar Producto - </button>
                            </div>
                        </div> ) }
                    </div>
                    <div className='order--sendOrder' >
                        <h3> Enviar la orden por Whatsapp </h3>
                        <button onClick={sendOrderByEmail} > Enviar Pedido por Correo </button>
                        <a href={redirectToWhatsapp} className='button--wsp' > Enviar Pedido por Whatsapp </a>
                    </div>
                </div>
            </section>
        </main>
    )
}


export default Order