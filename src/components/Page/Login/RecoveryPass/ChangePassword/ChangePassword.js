import axios from "axios"
import { useState } from "react"
import {useNavigate, useSearchParams} from 'react-router-dom'
import config from "../../../../../config/config"


const ChangePassword = () => {
    const [password, setPass] = useState('')
    const [sendPass, setSendPass] = useState('idle')
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const token = searchParams.get('token')
    console.log('Id: ', id)
    console.log('token: ', token)

    const handleSubmit = async(e) => {
        if (sendPass==='idle'){
            e.preventDefault()
            setSendPass('sending')
            try {
                const url = `${config.urlServer}/auth/change-password?id=${id}&token=${token}`
                const value = {password}
                console.log(value)
                const response = await axios.post(url, value)
                const {data} = response
                console.log(data)
                if (data.err) throw new Error(data.err)
                setSendPass('success')
                setPass('')
                setTimeout(backHome, 3000)
            } catch (error) {
                setSendPass('error')
                setTimeout(backHome, 3000)
            }
        }
    }

    const backHome = () => {
        console.log('Volviendo al Login');
        navigate('/login')
    }

    return(
        <main className='main--container' >
            <h1> Recuperar Contraseña </h1>
            <section className='section--container recoveryPass'>
                <h2> Escribe tu nueva contraseña  </h2>
                <div className='recoveryPass--container inner--container'> 
                    <form onSubmit={handleSubmit} className='form--container'>
                        <label>    
                            Contraseña: 
                            <input name='password' type='password' required 
                                value={password} onChange={ (e) => setPass(e.target.value) } />
                        </label>
                        <button type='submit' > Cambiar contraseña </button>
                    </form>
                    <div className='msg--container' >
                        { sendPass=='sending' && <p className='error--text'> Espere, estamos confirmando su email... </p> }
                        { sendPass=='success' && <p className='msg--text'> ¡Contraseña cambiada correctamente! Redirigiendo al login...</p> }
                        { sendPass=='error' && <p className='msg--text'> ¡Ha ocurrido un error, vuelva a intentarlo! Redirigiendo al login...</p> }
                    </div>
                </div>
            </section>
        </main>
    )
}


export default ChangePassword