import './Login.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {fetchResetAction, fetchRequestAction, fetchSuccessAction, fetchErrorAction} from '../../../redux/action/fetchAction'
import {userLoginAction} from '../../../redux/action/userAction'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import InputText from '../../Form/InputText'
import charQuantity from '../../../util/characters/quantity'
import config from '../../../config/config'
import AddEmail from './RecoveryPass/AddEmail/AddEmail'


const fetchThunk = (value, navigate) => {
    return async (dispatch) => {
        dispatch( fetchRequestAction() )
        try {
            const url = `${config.urlServer}/auth/login`
            const response = await axios.post(url, value)
            const {data} = response
            console.log(data)
            if (data.err) throw new Error(data.err)
            localStorage.setItem('session', true)
            localStorage.setItem('userId', data.id)
            localStorage.setItem('token', data.token)
            console.log('Sesion Iniciada!')
            dispatch( fetchSuccessAction() )
            dispatch( userLoginAction(data) )
            navigate('/profile')
        } catch (error) {
            dispatch( fetchErrorAction(error.message) )
        }
    }
}


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [recoverPass, setRecoveryPass] = useState(false)
    const {fetchState, fetchError} = useSelector( state => state.fetch )
    const {userMax, passMax, passMin} = charQuantity

    useEffect( () => dispatch(fetchResetAction()), [] )

    const initial = {
        userName: '',
        password: ''
    }

    const schema = Yup.object().shape({
        userName: Yup.string()
            .max(userMax, 'Nombre de usuario muy largo')
            .required('campo Requerido'),
        password: Yup.string()
            .min(passMin, 'Contraseña muy corta')
            .max(passMax, 'Contraseña muy larga')
            .required('campo Requerido')
    })

    const submit = (value) => {
        console.log(value)
        dispatch( fetchThunk(value, navigate) )
    }

    const recoveryPassword = () => {
        //navigate('/recoveryPassword-addEmail')
        setRecoveryPass(!recoverPass)
    }

    return (
        <main className='main--container login-container'>
            <h1 className="login-h1"> Iniciar Sesion </h1>
            <section className='section--container login'>
                <h2> Completa el formulario </h2>
                <div className='login--container inner--container' >
                    <Formik initialValues={initial} validationSchema={schema} onSubmit={submit} >
                        <Form className='form--container'>
                            <InputText name='userName' label='Nombre de usuario' type='text' />
                            <InputText name='password' label='Contraseña' type='password' />
                            <button type='submit' className='form--submit login-submit'>Iniciar Sesion</button>
                        </Form>
                    </Formik>
                    <div className='msg--container' >
                        { (fetchState=='error') && <p className='error--text'> {fetchError} </p> }
                        { (fetchState=='loading') && <p className='msg--text'> Cargando... </p> }
                        { (fetchState=='success') && <p className='msg--text'> ¡Se han guardado los cambios! </p> }
                    </div>
                    <div className='login--password' >
                        <button onClick={recoveryPassword} >¿Olvidaste tu contraseña o nombre de usuario?</button>
                        {
                            recoverPass ?
                                <AddEmail /> 
                            : null
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}


export default Login