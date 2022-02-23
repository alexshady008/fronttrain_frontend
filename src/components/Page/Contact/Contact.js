import './Contact.css'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import InputText from '../../Form/InputText'
import Select from '../../Form/Select'
import { useState } from 'react'
import axios from 'axios'
import config from '../../../config/config'



const Contact = () => {
    const redirectToWhatsapp = `https://api.whatsapp.com/send/?phone=${config.numberAdmin}&text=Hola%2C+me+gustaria+hacerte+una+consulta`
    const url = `${config.urlServer}/auth/contact`
    const [fetchState, setFetchState] = useState('idle')
    //const [error, setError] = useState(null)

    const initial = {
        name: '',
        email: '',
        phone: '',
        location: '',
        message: ''
    }

    const schema = Yup.object().shape({
        name: Yup.string().max(30, 'Exediste el límite de caracteres').required('Campo obligatorio'),
        email: Yup.string().email().required('Campo obligatorio'),
        phone: Yup.number().integer().required('Campo obligatorio'),
        location: Yup.string().required('Campo obligatorio'),
        message: Yup.string().max(500, 'Exediste el límite de caracteres').required('Campo obligatorio'),
    })

    const handleSubmit = async (value, {resetForm }) => {
        if (fetchState !== 'loading'){
            console.log(value);
            setFetchState('loading')
            try {
                const response = await axios.post(url, value)
                const {data} = response
                if (data.err) throw new Error(data.err)
                setFetchState('success')
                resetForm ()
            } catch (error) {
                setFetchState('error')
                //setError(error.message)
            }
        } 
    }


    return(
        <main className='main-container'>
            <section className='section--container contact'>
                <h2> Contacto </h2>
                <div className='contact--container inner--container'>
                    <Formik initialValues={initial} validationSchema={schema} onSubmit={handleSubmit} >
                        <Form className='form--container'>
                            <InputText name='name' type='text' label='Escriba su nombre' />
                            <InputText name='email' type='email' label='Escriba su email' />
                            <InputText name='phone' type='number' label='Escriba su telefono' />
                            <Select name='location' label='Elija su ubicacion' >
                                <option value='' > Ninguna  </option>
                                <option value='CABA' > CABA  </option>
                                <option value='Zona Sur' > AMBA Zona Sur  </option>
                                <option value='Xona Norte' > AMBA Zona Norte  </option>
                                <option value='Zona Oeste' > AMBA Zona Oeste  </option>
                                <option value='Buenos Aires' > Buenos Aires  </option>
                                <option value='Entre Rios' > Entre Ríos  </option>
                                <option value='Corrientes' > Corrientes  </option>
                                <option value='Santa Fe' > Santa Fe  </option>
                                <option value='Otro' > Otro </option>
                            </Select>
                            <InputText name='message' type='text' label='Escriba el mensaje' className='form--input-message' />
                            <button type='submit' className='form--submit'> Enviar </button>
                        </Form>
                    </Formik>
                    <div className='msg--container' >
                        { (fetchState=='error') && <p className='error--text'> ¡Ha ocurrido un error! </p> }
                        { (fetchState=='loading') && <p className='msg--text'> Enviando... </p> }
                        { (fetchState=='success') && <p className='msg--text'> ¡Mensaje enviado! </p> }
                        <div className='button--wsp-container'>
                            <a href={redirectToWhatsapp} className='button--wsp contact-button' > Whatsapp </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}


export default Contact



