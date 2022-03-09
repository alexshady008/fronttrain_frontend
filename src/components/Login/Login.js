import './Login.css'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {fetchRequestAction, fetchSuccessAction, fetchErrorAction, fetchResetAction} from '../../redux/action/fetchAction'
import {userLoginAction} from '../../redux/action/userAction'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import InputText from '../Form/InputText'
import config from '../../config/config'
import charQuantity from '../../util/characters/quantity'
import axios from 'axios'

const {userMax, userMin, passMax, passMin} = charQuantity

const fetchThunk = (value, navigate) => {
    return async (dispatch) => {
        console.log('Thunk Comenzado')
        dispatch( fetchRequestAction() )
        try {
            const url = `${config.urlServer}/auth/login`
            const response = await axios.post(url, value)
            const {data} = response
            console.log(data)
            if (data.err) throw new Error(data.err)
            localStorage.setItem('session', true)
            localStorage.setItem('token', data.token)
            console.log('Sesion Iniciada!')
            dispatch( fetchSuccessAction() )
            dispatch( userLoginAction(data) )
            navigate('/admin')
        } catch (error) {
            dispatch( fetchErrorAction(error.message) )
        }
    }
}

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {fetchState, fetchError} = useSelector( state => state.fetch )

    useEffect( () => dispatch(fetchResetAction()), [] )

    const initial = {
        userName: '',
        password: ''
    }

    const schema = Yup.object().shape({
        userName: Yup.string()
            .min(userMin, 'Nombre de usuario muy corto')
            .max(userMax, 'Nombre de usuario muy largo')
            .required(),
        password: Yup.string()
            .min(passMin, 'Contraseña muy corta')
            .max(passMax, 'Contraseña muy larga')
            .required()
    })

    const submit = (value) => {
        console.log(value)
        dispatch( fetchThunk(value, navigate) )
    }

    return (
        <main className='main--container admin-login'>
            <h1> Iniciar Sesion </h1>
            <section className='section--container login'>
                <h2> Completa el formulario </h2>
                <div className='login--container inner--container' >
                    <Formik initialValues={initial} validationSchema={schema} onSubmit={submit} >
                        <Form className='form--container'>
                            <InputText name='userName' label='Nombre de usuario' type='text' />
                            <InputText name='password' label='Contraseña' type='text' />
                            <button type='submit' className='form--submit'>Iniciar Sesion</button>
                        </Form>
                    </Formik>
                    <div className='msg--container' >
                        { (fetchState=='error') && <p className='error--text'> {fetchError} </p> }
                        { (fetchState=='loading') && <p className='msg--text'> Cargando... </p> }
                        { (fetchState=='success') && <p className='msg--text'> ¡Se han guardado los cambios! </p> }
                    </div>
                </div>
            </section>
        </main>
    )
}


export default Login