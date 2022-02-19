import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {fetchRequestAction, fetchSuccessAction, fetchErrorAction} from '../../../../redux/action/fetchAction'
import {productsNotFoundAction, productsFoundAction} from '../../../../redux/action/productsAction'
import {filterResetAction} from '../../../../redux/action/filterAction'
import axios from 'axios'
import config from '../../../../config/config'
import Product from './Product/Product'
import Pagination from '../../../Home/ListProducts/Products/Pagination/Pagination'


const fetchThunk = () => {
    return async (dispatch) => {
        dispatch( filterResetAction() )
        dispatch( fetchRequestAction() )
        try {
            const url = `${config.urlServer}/product/products?limit=${config.limitPage}&offset=0`
            const response = await axios.get(url)
            const {data} = response
            if (data.err) throw new Error(data.err)
            dispatch( fetchSuccessAction() )
            dispatch( productsFoundAction(data) )
        } catch (error) {
            dispatch( fetchErrorAction() )
            dispatch( productsNotFoundAction() )
            console.log('ERR: ', error.message)
        }
    }
}



const Products =  () => {
    const dispatch = useDispatch()
    const products = useSelector( state => state.products )
    const productsError = products.error
    const productsList = products.productsList

    useEffect(() => {
        if (productsList.length === 0){
            dispatch( fetchThunk() )
        }
      }, [])

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


export default Products