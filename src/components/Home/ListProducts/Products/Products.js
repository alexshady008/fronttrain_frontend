
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {productsFoundAction, productsNotFoundAction} from '../../../../redux/action/productsAction'
import Product from './Product/Product'
import Pagination from './Pagination/Pagination'
import config from '../../../../config/config'
import axios from 'axios'


const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector( state => state.products )
    const productsError = products.error
    const productsList = products.productsList
    //console.log('productsList: ', productsList)

    useEffect( async () => {
        //console.log('Se actualiza el componente!')
        try {
            const url = `${config.urlServer}/product/products?limit=${config.limitPage}&offset=0`
            const response = await axios.get(url)
            const {data} = response
            dispatch( productsFoundAction(data) )
        } catch (error) {
            dispatch( productsNotFoundAction() )
        }
    }, [] )

    return(
        <section className='section--container products'>
            <h2>Listado de Productos</h2>
            <div className='products--container inner--container'>
                { !productsError && 
                    (productsList.map( product => <Product key={product.id} value={product} /> ) )
                }    
                { 
                productsError=='notFound' && 
                    (<div className='msg--container'> 
                        <p className='msg--text' >Productos no entontrados!</p> 
                    </div> ) 
                }
                <Pagination />
            </div>
        </section>
    )
}


export default Products;
