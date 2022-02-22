import './Order.css'
import {useSelector, useDispatch} from 'react-redux'
import {deleteProductAction, orderProductsAction} from '../../../redux/action/orderAction'
import OrderProduct from './OrderProduct/OrderProduct'
import { useState } from 'react'
import config from '../../../config/config'
import axios from 'axios'
import setOrderMessage from '../../../util/sendEmails/setMsgOrderWsp'

const returnRedirectToWhatsapp = (listProducts, totalProducts, totalPrice) => {
    const text = setOrderMessage(listProducts, totalProducts, totalPrice)
    const msgWsp = `https://api.whatsapp.com/send/?phone=${config.numberAdmin}&text=${text}`
    console.log('msgWsp: ', msgWsp)
    return msgWsp
}

const returnTotals = (list) => {
    let totalProducts = 0
    let totalPrice = 0
    list.forEach(order => {
        totalProducts = totalProducts + order.quantity
        totalPrice = totalPrice + ( order.quantity * order.price )
    });
    return {
        totalProducts,
        totalPrice
    }
}

const returnOrder = (orderList, totalProducts, totalPrice) => {
    const order = {
        listProducts: orderList.map( order => {
           return {
               cod: order.cod,
               productBrand: order.productBrand,
               quantity: order.quantity,
               price: (order.quantity * order.price)
           }
        } ),
        totalProducts,
        totalPrice
    }

    console.log(order)
    return order
}


const Order = () => {
    const [quantityChanged, setquantityChanged] = useState(0)
    const [deleted, setDeleted] = useState(0)
    const [fetchState, setFetchState] = useState('idle')
    const dispatch = useDispatch()
    const orderList = useSelector( state => state.order.productsList )
    const orderProducts = useSelector( state => state.order.orderProducts )
    const totals = returnTotals(orderList)
    const order = returnOrder(orderList, totals.totalProducts, totals.totalPrice)
    const token = localStorage.getItem('token')
    const fetchConfig = {headers: { Authorization: `Bearer ${token}` } }
    const redirectToWhatsapp= returnRedirectToWhatsapp(order.listProducts, order.totalProducts, order.totalPrice)

    const handleMainComponent = () => {
        setquantityChanged(quantityChanged+1)
    }
    
    const deleteProduct = (product) => {
        setDeleted(deleted+1)
        dispatch( deleteProductAction(product) )
    }

    const sendOrderByEmail = async () => {
        console.log('Orden: ', order)
        setFetchState('loading')
        try {
            const url = `${config.urlServer}/auth/order`
            const response = await axios.post(url, order, fetchConfig)
            const {data} = response
            console.log(data)
            if (data.err) throw new Error(data.err)
            setFetchState('success')
            dispatch( orderProductsAction() )
        } catch (error) {
            setFetchState('error')
        }
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
                            <OrderProduct setquantityChanged={handleMainComponent} number={index} value={orderProduct} />
                            <div className='order--product-delete' >
                                <button onClick={() => deleteProduct(orderProduct) }
                                className='delete--button' > Eliminar Producto - </button>
                            </div>
                        </div> ) }
                    </div>
                    <div className='order--sendOrder' >
                        <div className='order--sendOrder--text'>
                            <h3> Productos Totales: {totals.totalProducts} </h3>
                            <h3> Precio Total: {totals.totalPrice} </h3>
                        </div>
                        <div className='order--sendOrder--buttons'>    
                            <a href={redirectToWhatsapp} className='button--wsp' > Enviar Pedido por Whatsapp </a>
                            <button onClick={sendOrderByEmail} > Enviar Pedido por Correo </button>
                        </div>
                        <div className='msg--container' >
                            { (fetchState=='error') && <p className='error--text'> ¡Ha ocurrido un error! </p> }
                            { (fetchState=='loading') && <p className='msg--text'> Enviando pedido... </p> }
                            { (fetchState=='success') && <p className='msg--text'> ¡Mensaje enviado! </p> }
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}


export default Order