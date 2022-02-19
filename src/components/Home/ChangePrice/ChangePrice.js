import './ChangePrice.css'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import InputText from '../../Form/InputText'
import Select from '../../Form/Select'
import axios from 'axios'
import config from '../../../config/config'
import { useState } from 'react'


const ChangePrice = () => {
    const [priceUpdated, setPriceUpdated ] = useState('idle')

    const initial = {
        percentageType: '',
        amount: '',
        productType: '',
        productBrand: ''
    }

    const schema = Yup.object().shape({
        percentageType: Yup.string().required(),
        amount: Yup.number().required(),
        productType: Yup.number().integer().required(),
        productBrand: Yup.string().required()
    })

    const handleSubmit = async (values) => {
        const newValues = {
            ...values,
            productType: Number(values.productType)
        }
        console.log(newValues)
        try {
            const token = localStorage.getItem('token')
            const url = `${config.urlServer}/auth/change-prices`
            const response = await axios.post(url, newValues, {
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            } )
            const {data} = response
            if (data.err) throw new Error(data.err)
            setPriceUpdated('success')
            console.log(data)
        } catch (error) {
            setPriceUpdated('error')
        }
    }

    return(
        <main className='main-container'>
            <h1>Actualizar precio</h1>
            <section className='section--container changePrice'>
                <div className='changePrice--container inner--container' > 
                    <Formik 
                        initialValues={initial}
                        validationSchema={schema}
                        onSubmit={handleSubmit}>
                            <Form className='form--container'>
                                <Select name='percentageType' label='Seleccionar el tipo de Porcentaje' >
                                    <option value='' >Seleccionar Tipoe</option>
                                    <option value='aum' >Aumento</option>
                                    <option value='desc' >Descuento</option>
                                </Select>
                                <InputText name='amount' type='number' label='Ingresar tipo cantidad de Porcentaje' />
                                <Select name='productType' label='Categoria de producto que se modificarán los precios' >
                                    <option value='' >Elegir Categoria</option>
                                    <option value='1' >Bujes</option>
                                    <option value='2' >Rotulas</option>
                                    <option value='3' >Extremos</option>
                                    <option value='4' >Axiales</option>
                                    <option value='5' >Bieletas</option>
                                    <option value='6' >Parrillas</option>
                                </Select>
                                <Select name='productBrand' label='Marca de Producto que se modificarán los precios' >
                                    <option value='' >Elegir marca</option>
                                    <option value='icsa' >ICSA</option>
                                    <option value='gomet' >Gomet</option>
                                    <option value='ms' >MS</option>
                                    <option value='locma' >Locma</option>
                                    <option value='borghetti' >Borghetti</option>
                                </Select>
                                <button type='submit' className='form--submit' >Actualizar precios</button>
                            </Form>
                    </Formik>

                    <div className='msg--container' >
                        { 
                            priceUpdated=='error' &&
                            <p className='error--text'> ¡Error: No se han modificado los precios! </p>
                        }
                        { (priceUpdated=='success') && <p className='msg--text'> ¡Se han actualizado los precios! </p> }
                    </div>
                </div>
            </section>
        </main>
    )
}


export default ChangePrice;
