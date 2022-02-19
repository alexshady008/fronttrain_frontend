import axios from 'axios'
import { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {userLoginAction} from '../../../redux/action/userAction'
import config from '../../../config/config'


const UserConfirm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userConfirm, setUserConfirm] = useState('idle')
    const {userId} = useParams()
    console.log('userId: ', userId)

    useEffect( async() => {
        setUserConfirm('loading')
        try {
            const url = `${config.urlServer}/auth/confirm/${userId}`
            const response = await axios.get(url)
            const {data} = response
            console.log(data)
            if (data.err) throw new Error(data.err)
            localStorage.setItem('session', true)
            localStorage.setItem('userId', data.id)
            localStorage.setItem('token', data.token)
            console.log('Sesion Iniciada!')
            setUserConfirm('success')
            dispatch( userLoginAction(data) )
        } catch (error) {
            console.log('Error: ', error.message)
            setUserConfirm('error')
        }
    }, [] )


    const homeBack = () => {
        navigate('/')
    }


    return(
        <main className='main--container'>
            <h1> Confirmación de Usuario </h1>
            <section className='section--container userConfirm'>
                { 
                    userConfirm=='loading' &&
                    <div className='userConfirm--container inner--container' >
                        <h2> Confirmando usuario... </h2>
                    </div>
                }
                { 
                    userConfirm=='success' &&
                    <div className='userConfirm--container inner--container' >
                        <h2 className='userConfirm--title'> ¡Usuario confirmado!</h2>
                        <p className='userConfirm--text' > Has iniciado sesion. </p>
                        <button onClick={homeBack} className='userConfirm--button'> Volver al Inicio </button>
                    </div>
                }
                { 
                    userConfirm=='error' &&
                    <div className='userConfirm--container inner--container' >
                        <h2 className='userConfirm--title'> ¡Ha ocurrido un error!</h2>
                        <p className='userConfirm--text' > Usuario no confirmado. </p>
                        <button onClick={homeBack} className='userConfirm--button'> Volver al Inicio </button>
                    </div>
                }
            </section>
        </main>
    )
}


export default UserConfirm