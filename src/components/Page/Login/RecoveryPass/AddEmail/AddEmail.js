import axios from "axios"
import { useState } from "react"
import config from "../../../../../config/config"


const AddEmail = () => {
    const [email, setEmail] = useState('')
    const [sendEmail, setSendEmail] = useState('idle')

    const handleSubmit = async(e) => {
        if (sendEmail!=='sending'){
            e.preventDefault()
            setSendEmail('sending')
            try {
                const url = `${config.urlServer}/auth/recovery-password`
                const value = {email}
                //console.log(value)
                const response = await axios.post(url, value)
                const {data} = response
                //console.log(data)
                if (data.err) throw new Error(data.err)
                setSendEmail('success')
                setEmail('')
            } catch (error) {
                setSendEmail('error')
            }
        }
    }

    return(
        <div className='recoveryPass--container' >
            <form onSubmit={handleSubmit} className='form--container'>
                <label>    
                    Escribir tu email 
                    <input name='email' type='email' value={email} onChange={ (e) => setEmail(e.target.value) } />
                </label>
                <button type='submit' > Confirmar email </button>
            </form>
            <div className='msg--container' >
                { sendEmail=='sending' && <p className='error--text'> Espere, estamos confirmando su email... </p> }
                { sendEmail=='success' && <p className='msg--text'> Confirmación correcta! Verifique su email y siga las intrucciones para cambiar su contraseña.</p> }
                { sendEmail=='error' && <p className='msg--text'> ¡Ha ocurrido un error! </p> }
            </div>
        </div>
    )
}


export default AddEmail