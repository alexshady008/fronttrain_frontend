
import {useDispatch} from 'react-redux'
import {fetchRequestAction, fetchSuccessAction, fetchErrorAction} from '../../../../redux/action/fetchAction'
import {productsFoundAction, productsNotFoundAction} from '../../../../redux/action/productsAction'
import scrollTop from '../../../../util/Scroll/scroll'
import {filterFormAction} from '../../../../redux/action/filterAction'
import {useState} from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import Select from '../../../Form/Select'
import InputText from '../../../Form/InputText'
import config from '../../../../config/config'
import axios from 'axios'


const fetchThunk = (value) => {
    return async (dispatch) => {
        dispatch( filterFormAction(value) )
        dispatch( fetchRequestAction() )
        try {
            const url = `${config.urlServer}/product/productsFilter?limit=${config.limitPage}&offset=0`
            const response = await axios.post(url, value)
            const {data} = response
            console.log('DATA: ', data)
            if (data.err) throw new Error(data.err)
            dispatch( fetchSuccessAction() )
            dispatch( productsFoundAction(data) )
        } catch (error) {
            dispatch( fetchErrorAction() )
            dispatch( productsNotFoundAction() )
            //console.log('ERR', error.message)
        }
    }
}

const ProductFilter = () => {
    const dispatch = useDispatch()
    const [productType, setProductType] = useState(0)
    const [brandType, setBrandType] = useState('')
    const [brandCar, setBrandCar] = useState('')
    const [carType, setCarType] = useState('')
    const [cod, setCod] = useState('')

    const formValue = {
        categoryId: productType,
        productBrand: brandType,
        carBrand: brandCar,
        carType: carType,
        productCod: cod
    }
    //console.log(formValue)

    const schema = Yup.object().shape({
        categoryId: Yup.number(),
        productBrand: Yup.string(),
        carBrand: Yup.string(),
        carType: Yup.string(),
        productCod: Yup.string()
    })

    const submit = () => {
        scrollTop()
        dispatch( fetchThunk(formValue) )
    }

    return(
        <section className='section--container productFilter ' >
            <h2 className='title-productFilter-admin'>Buscar Productos</h2>
            <div className='productFilter--container inner--container' >
                <Formik initialValues={formValue} validationSchema={schema} onSubmit={submit} >
                    <Form className='form--container'>
                        <Select label='Tipo de Producto' name='categoryId' value={productType}
                            onChange={ (e) => setProductType(Number(e.target.value)) } >
                                <option value={0} >Todos</option>
                                {(brandType=='' || brandType=='icsa' || brandType=='gomet') 
                                && <option value={1} >Bujes</option>}
                                {(brandType=='' || brandType=='ms' || brandType=='locma') && 
                                <> <option value={2} >Rotulas</option>
                                <option value={3} >Extremos</option>
                                <option value={4} >Axiales</option>
                                <option value={5} >Bieletas</option> </>}
                                {(brandType=='' || brandType=='borghetti') 
                                && <option value={6} >Parrillas</option>}
                        </Select>
                        <Select label='Marca de Producto' name='productBrand' value={brandType}
                            onChange={ (e) => setBrandType(e.target.value) } >
                            <option value='' >Todos</option>
                            { (productType==1 || productType==0) &&
                            (<> <option value='icsa' >ICSA</option>
                            <option value='gomet' >Gomet</option> </>)
                             }
                            { (productType==2 || productType==3 || productType==4 || productType==5 || productType==0) &&
                            (<> <option value='ms' >MS</option>
                            <option value='locma' >Locma</option> </>)
                             }
                            { (productType==6 || productType==0) && (<option value='borghetti' >Borghetti</option>) }
                        </Select>
                        <Select label='Marca de auto' name='carBrand' value={brandCar}
                            onChange={ (e) => setBrandCar(e.target.value)} >
                            <option value='' >Todos</option>
                            <option value='fiat' >Fiat</option>
                            <option value='chevrolet' >Chevrolet</option>
                            <option value='peugeot' >Peugeot</option>
                            <option value='renault' >Renault</option>
                            <option value='volkswagen' >Volkswagen</option>
                            <option value='ford' >Ford</option>
                            <option value='citroen' >Citroen</option>
                            <option value='dodge' >Dodge</option>
                            <option value='toyota' >Toyota</option>
                        </Select>
                        <InputText label='Nombre del auto' type='text' name='carType' value={carType}
                            onChange={ (e) => setCarType(e.target.value)} />
                        <InputText label='Código del producto' type='text' name='cod' value={cod}
                            onChange={ (e) => setCod(e.target.value)} />
                        <div className='productFilter-submit'><button type='submit' className='form--submit submit-catalogue' >Buscar</button></div>
                    </Form>
                </Formik>
            </div>
        </section>
    )
}


export default ProductFilter
