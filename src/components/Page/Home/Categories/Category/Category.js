//import './Category.css'
// import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchRequestAction, fetchSuccessAction, fetchErrorAction} from '../../../../../redux/action/fetchAction'
import {productsFoundAction, productsNotFoundAction} from '../../../../../redux/action/productsAction'
import {filterByCategoryAction} from '../../../../../redux/action/filterAction'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import config from '../../../../../config/config'


const fetchThunk = (id, navigate ) => {
    return async (dispatch) => {
        dispatch( filterByCategoryAction(id) )
        dispatch( fetchRequestAction() )
        try {
            const url = `${config.urlServer}/category/${id}?limit=${config.limitPage}&offset=0`
            const response = await axios.get(url)
            const {data} = response
            if (data.err) throw new Error(data.err)
            const {product} = data
            dispatch( fetchSuccessAction() )
            dispatch( productsFoundAction(product) )
            //window.scrollTo(0, 0);
            navigate('/product')
        } catch (error) {
            dispatch( fetchErrorAction() )
            dispatch( productsNotFoundAction() )
            console.log('ERR: ', error.message)
        }
    }
}



const Category = ({title, id}) => {
    const dispatch = useDispatch()
    const fetchState = useSelector(state =>  state.fetch.fetchState )
    const navigate = useNavigate()
    const imgUrl = `/assets/products/${title}.jpg`

    const getProductCategory = async () => {
        if (fetchState !== 'loading'){
            console.log('Traer los productos de la categoria ', title)
            dispatch( fetchThunk(id, navigate) )
        }
    }

    return(
        <div className='category--container' onClick={getProductCategory}>
            <img className='category--img' src={imgUrl} alt='Categoria' />
            <h2 className='category--title'> {title} </h2>
        </div>
    )
}


export default Category