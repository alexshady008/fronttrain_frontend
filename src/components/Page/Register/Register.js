import './Register.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {fetchResetAction, fetchRequestAction, fetchSuccessAction, fetchErrorAction} from '../../../redux/action/fetchAction'
import {userRegisterAction} from '../../../redux/action/userAction'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import InputText from '../../Form/InputText'
import charQuantity from '../../../util/characters/quantity'
import config from '../../../config/config'



const fetchThunk = (value, navigate) => {
    return async (dispatch) => {
        dispatch( fetchRequestAction() )
        try {
            const url = `${config.urlServer}/auth/register`
            const response = await axios.post(url, value)
            const {data} = response
            //console.log(data)
            if (data.err) throw new Error(data.err)
            dispatch( fetchSuccessAction() )
            dispatch( userRegisterAction(data) )
        } catch (error) {
            console.log('Error: ', error.message)
            dispatch( fetchErrorAction(error.message) )
        }
    }
}


const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {fetchState, fetchError} = useSelector( state => state.fetch )
    const {userMax, passMax, passMin} = charQuantity

    useEffect( () => {
        //console.log('Reinicia el fetch state')
        dispatch(fetchResetAction())
    }, [] )

    const initial = {
        userName: '',
        email: '',
        password: '',
        role: config.userRoleDefault
    }

    const schema = Yup.object().shape({
        userName: Yup.string()
            .max(userMax, 'Nombre de usuario muy largo')
            .required('campo Requerido'),
        email: Yup.string()
            .email('Email incorrecto')
            .required('campo Requerido'),
        password: Yup.string()
            .min(passMin, 'Contraseña muy corta')
            .max(passMax, 'Contraseña muy larga')
            .required('campo Requerido')
    })

    const handleSubmit = (value) => {
        if (fetchState!=='loading'){
            console.log(value)
            dispatch( fetchThunk(value) )
        }
    }

    const homeBack = () => {
        navigate('/')
    }


    return (
        <main className='main--container register-container'>
            <h1> Registrarse </h1>
            {
                (fetchState!=='success')
                ?
                <section className='section--container register'>
                    <h2> Completa el formulario </h2>
                    <div className='register--container inner--container' >
                        <Formik initialValues={initial} validationSchema={schema} onSubmit={handleSubmit} >
                            <Form className='form--container'>
                                <InputText name='userName' label='Nombre de Usuario:' type='text' />
                                <InputText name='email' label='Correo Electrónico:' type='email' />
                                <InputText name='password' label='Contraseña:' type='password' />
                                <button type='submit' className='form--submit register-button'>Registrarse</button>
                            </Form>
                        </Formik>
                        <div className='msg--container' >
                            { (fetchState=='error') && <p className='error--text'> ¡Error: Email o Nombre de usuario existente!</p> }
                            { (fetchState=='loading') && <p className='msg--text'> Registrando... </p> }
                            {/* { (fetchState=='success') && <p className='msg--text'> ¡Usuario creado exitosamente! </p> } */}
                        </div>
                    </div>
                </section>
                :
                <section className='section--container register'>
                    <h2> ¡Usuario creado exitosamente! </h2>
                    <div className='register--container inner--container' >
                        <p className='register--success-text'> ¡Debes confirmar tu email para iniciar sesion! </p>
                        <button onClick={homeBack} className='register--success-button'> Volver al Inicio </button>
                    </div>
                </section>
            }
        </main>
    )
}


export default Register