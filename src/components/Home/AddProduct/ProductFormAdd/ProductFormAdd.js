
import {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import InputText from '../../../Form/InputText'
import Select from '../../../Form/Select'
import {updateFormAction, addProductErroAction, upsertProductAction} from '../../../../redux/action/addProductAction'
import {initial_value} from '../../../../redux/reducer/addproductReducer'
import {fetchRequestAction, fetchSuccessAction, fetchErrorAction, fetchResetAction} from '../../../../redux/action/fetchAction'
import config from '../../../../config/config'

const createFormData = (values) => {
    const newForm = new FormData()
    if (values.id) newForm.append('id', values.id)
    newForm.append('cod', values.cod)
    newForm.append('description', values.description)
    newForm.append('price', values.price)
    newForm.append('categoryId', values.categoryId)
    newForm.append('productBrand', values.productBrand)
    newForm.append('carBrand', values.carBrand)
    newForm.append('carType', values.carType)
    newForm.append('image', values.image)
    return newForm
}

const fetchThunk = (values, token, inputFile, setValues) => {
    return async(dispatch) => {
        dispatch( fetchRequestAction() )
        try {
            const url = `${config.urlServer}/product/create`
            const fetchConfig = {
                headers: { 
                    Authorization: `Bearer ${token}`
                 }
            }
            if (typeof values.image !== 'string' && values.image !== null)  {
                console.log('Crear Form Data',)
                values = createFormData(values)
            }
            console.log('End values: ', values)
            const response = await axios.post(url, values, fetchConfig)
            const {data} = response
            console.log('response: ', data)
            if (data.err) throw new Error(data.err)
            inputFile.current.value = ''
            setValues(initial_value.details)
            dispatch( upsertProductAction() )
            dispatch( fetchSuccessAction() )
        } catch (error) {
            console.log('Error: ', error)
            dispatch( fetchErrorAction(error.message) )
            dispatch( addProductErroAction(error) )
        }
    }
}


const ProductFormAdd = () => {
    const inputFile = useRef(null)
    const dispatch = useDispatch()
    const {fetchState} = useSelector( state => state.fetch )
    //const token = useSelector( state => state.user.token )
    const token = localStorage.getItem('token')
    const addproduct = useSelector( state => state.addProduct )
    const addProductType = addproduct.type
    const [values, setValues] = useState(addproduct.details)
    const {id, cod, description, price, categoryId, productBrand, carBrand, carType, image} = values
    // console.log('inputFile: ', image)

    
    useEffect( () => {
        dispatch( updateFormAction(values) )
    }, [cod, description, price, categoryId, productBrand, carBrand, carType, image] )

    useEffect( () => dispatch(fetchResetAction()), [] )

    const submit = () => {
        const submitValues = {
            ...values,
            price:Number(price), 
            categoryId:Number(categoryId), 
            //image: formData.image
        }
        console.log('submitValues: ', submitValues)
        dispatch( fetchThunk(submitValues, token, inputFile, setValues) )
    }

    return(
        <section className='section--container productFormAdd'>
            <h2> Completa el formulario </h2>
            <div className='productFormAdd--container inner--container' >
                <Formik initialValues={values}  onSubmit={submit} >
                    <Form className='form--container'>
                        <InputText name='cod' label='Código del producto' type='text' 
                        value={cod} onChange={ (e) => setValues({...values, cod:e.target.value}) } />
                        <InputText name='description' label='Descripción del producto' type='text' 
                        value={description} onChange={ (e) => setValues({...values, description:e.target.value}) } />
                        <InputText name='price' label='Precio del producto' type='number' 
                            value={price} onChange={ (e) => setValues({...values, price:e.target.value}) } />
                        <Select label='Tipo de Producto' name='categoryId' value={categoryId}
                            onChange={ e => setValues({...values, categoryId:e.target.value})  } >
                            <option value='' >Elegir Categoria</option>
                            <option value='1' >Bujes</option>
                            <option value='2' >Rotulas</option>
                            <option value='3' >Extremos</option>
                            <option value='4' >Axiales</option>
                            <option value='5' >Bieletas</option>
                            <option value='6' >Parrillas</option>
                        </Select>
                        <Select label='Marca de Producto' name='productBrand' value={productBrand}
                            onChange={ e => setValues({...values, productBrand:e.target.value})  } >
                            <option value='' >Elegir marca</option>
                            { (categoryId=='1' || categoryId=='') &&
                            (<> <option value='icsa' >ICSA</option>
                            <option value='gomet' >Gomet</option> </>)}
                            { (categoryId=='2' || categoryId=='3' || categoryId=='4' || categoryId=='5' || categoryId=='') &&
                            (<> <option value='ms' >MS</option>
                            <option value='locma' >Locma</option> </>) }
                            { (categoryId=='6' || categoryId=='') && (<option value='borghetti' >Borghetti</option>) }
                        </Select>
                        <Select label='Marca de auto' name='carBrand' value={carBrand}
                            onChange={ e => setValues({...values, carBrand:e.target.value})  } >
                            <option value='' >Elegir Marca</option>
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
                        <InputText name='carType' label='Nombre del auto' type='text' value={carType}
                                onChange={ (e) => setValues({...values, carType:e.target.value}) } />
                        <label> 
                            Agregar una Imagen
                            <input  name='image' type='file' accept="image/png, image/jpeg" ref={inputFile} 
                            onChange={ (e) => setValues({...values, image:e.target.files[0]})} />  
                        </label>
                       <div className='addProduct-submit'><button type='submit' className='form--submit' >Añadir Producto</button></div> 
                    </Form>
                </Formik>
                <div className='msg--container' >
                    { 
                        (fetchState=='error' && addProductType=='err') &&
                        <p className='error--text'> ¡Error: Datos incompletos o datos incorrectos! </p>
                    }
                    { (fetchState=='loading') && <p className='msg--text'> Cargando... </p> }
                    { (fetchState=='success') && <p className='msg--text'> ¡Se han guardado los cambios! </p> }
                </div>
            </div>
        </section>
    )
}


export default ProductFormAdd