import {useSelector, useDispatch} from 'react-redux'
import config from '../../../../../config/config'
import axios from 'axios'
import {filterPaginationAction} from '../../../../../redux/action/filterAction'
import {productsFoundAction, productsNotFoundAction} from '../../../../../redux/action/productsAction'
import {fetchRequestAction, fetchSuccessAction, fetchErrorAction} from '../../../../../redux/action/fetchAction'
import scrollTop from '../../../../../util/Scroll/scroll'


const fetchThunk = (value, offset) => {
    return async (dispatch) => {
        //console.log('Offset Actualizado: ', offset)
        dispatch( filterPaginationAction(offset) )
        dispatch( fetchRequestAction() )
        try {
            const url = `${config.urlServer}/product/productsFilter?limit=${config.limitPage}&offset=${offset*config.limitPage}`
            const response = await axios.post(url, value)
            const {data} = response
            //console.log('DATA: ', data)
            if (data.err) throw new Error(data.err)
            dispatch( fetchSuccessAction() )
            dispatch( productsFoundAction(data) )
        } catch (error) {
            dispatch( fetchErrorAction() )
            dispatch( productsNotFoundAction() )
            console.log('ERR', error.message)
        }
    }
}


const Pagination = () => {
    const dispatch = useDispatch()
    const filter = useSelector( state => state.filter )
    const {offset} = filter
    
    const filterValues = {
        categoryId: filter.categoryId,
        productBrand: filter.productBrand,
        carBrand: filter.carBrand,
        carType: filter.carType
    }
    // console.log('Offset: ', offset)
    // console.log('FilterValues: ', filterValues)

    const leftPagination = () => {
        if ((offset)>0){
            scrollTop()
            dispatch( fetchThunk(filterValues, offset-1) )
        }
    }

    const rightPagination = () => {
        if ((offset)<config.limitOffset){
            scrollTop()
            dispatch( fetchThunk(filterValues, offset+1) )
        }
    }

    return(
        <div className='product--pagination--container'>
            <h3>Paginacion</h3>
            <button className='pagination--arrow' onClick={leftPagination} > {'<'} </button>
            { (offset>0) && <button className='pagination--pageNumber' onClick={leftPagination} > {offset} </button> }
            <p className='pagination--pageNumber' > {offset+1} </p>
            {(offset<config.limitOffset && <button className='pagination--pageNumber' onClick={rightPagination} > {offset+2} </button> )}
            <button className='pagination--arrow' onClick={rightPagination} > {'>'} </button>
        </div>
    )
}


export default Pagination