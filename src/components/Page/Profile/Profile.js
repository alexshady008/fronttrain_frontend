import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {userDetailsAction, userLogoutAction} from '../../../redux/action/userAction'
import config from "../../../config/config"

const userInitial = {
    username: '',
    email: '',
    role: '',
    avatar: null,
    client: null
}

const Profile = () => {
    var urlImg
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const [avatarLoaded, setAvatar] = useState(false) 
    const [fetchAvatar, setFetchAvatar] = useState('idle') 
    const [user, setUser] = useState(userInitial) 
    const {username, email, avatar, client} = user
    const fetchConfig = {headers: { Authorization: `Bearer ${token}` } }
    //console.log('user: ', user)

    if (!avatarLoaded){
        if (avatar===null) urlImg = 'assets/photo_user_default.png'
        else urlImg = `${config.urlServerUserDb}${avatar}`
    } else {
        urlImg = URL.createObjectURL(avatarLoaded)
    }

    useEffect( async() => {
        //console.log('Use Effect: ', 'Inicial')
        if (id){
            try {
                const url = `${config.urlServer}/user/${id}`
                const response = await axios.get(url, fetchConfig)
                const {data} = response
                if (data.err) throw new Error(data.err)
                setUser( data )
                dispatch( userDetailsAction(data) )
            } catch (error) {
                console.log('Error: ', error.message)
            }
        }
    }, [] )


    useEffect( async() => {
        if (avatarLoaded){
            //console.log('Use Effect: ', 'avatarLoaded')
            setFetchAvatar('loading')
            try {
                const newForm = new FormData()
                newForm.append('avatar', avatarLoaded)
                const url = `${config.urlServer}/user/avatar/${id}`
                const response = await axios.patch(url, newForm, fetchConfig)
                const {data} = response
                //console.log('Data: ', data)
                if (data.err) throw new Error(data.err)
                setFetchAvatar('success')
            } catch (error) {
                setFetchAvatar('error')
            }
        }
    }, [avatarLoaded] )


    const logout = () => {
        localStorage.removeItem('session')
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        dispatch( userLogoutAction() )
        navigate('/')
    }

    const updateProfile = () => {
        navigate('/updateProfile')
    }


    return(
        <main className='main--container'>
            <h1> Mi Perfil </h1>
            <section className='section--container profile'>
                <h2> Datos de usuario </h2>
                <div className='profile--container inner--container' >
                    <div className='profile--user-details' >
                        <div className='profile--user-text' > 
                            <p className='profile--username' > Nombre de usuario: {username} </p>
                            <p className='profile--email' > Correo Electrónico: {email} </p>
                        </div>
                        <div className='profile--user-img'>
                            { 
                                !avatarLoaded 
                                ?
                                <picture className='user--picture'> <img src={urlImg} alt='Imagen del usuario' />  </picture> 
                                :
                                <picture className='user--picture'> <img src={urlImg} alt='Imagen del usuario' />  </picture>
                            }
                            <div className='user--changeAvatar'>
                                <label className='changeAvatar--button'>
                                    Cambiar imagen de perfil
                                    <input type='file' name='avatar' accept="image/png, image/jpeg"  
                                    onChange={e => setAvatar(e.target.files[0])} style={{display:'none'}} />
                                </label>
                                <div className='msg--container' >
                                    { (fetchAvatar=='error') && <p className='error--text'> ¡Ha ocurrido un error! </p> }
                                    { (fetchAvatar=='loading') && <p className='msg--text'> Cargando Imagen... </p> }
                                    { (fetchAvatar=='success') && <p className='msg--text'> ¡Se han guardado los cambios! </p> }
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        client !== null ?
                        <div className='profile--client-details'>
                            <p className='profile--client-text' > ¡Eres un cliente de Front Train! </p>
                            { client.name && <p className='profile--client-name' > Nombre: {client.name} </p> }
                            { client.lastName && <p className='profile--client-lastName' > Apellido: {client.lastName} </p> }
                            { client.phoneNumber && <p className='profile--client-phoneNumber' > Teléfono: {client.phoneNumber} </p> }
                            { client.location && <p className='profile--client-location' > Ubicación: {client.location} </p> }
                            { client.storeName && <p className='profile--client-storeName' > Nombre de la tienda: {client.storeName} </p> }
                            { client.storeDescription && <p className='profile--client-storeDescription' > Descripción de la tienda: {client.storeDescription} </p> }
                        </div> :
                        <div className='profile--client-details'>
                            <p className='profile--client-text' > ¡No eres un cliente! </p>
                            <p className='profile--client-text' > ¡Para ser un cliente debes realizar al menos una compra! </p>
                            <button onClick={updateProfile} className='profile--button' >Actualizar Datos del cliente</button>
                        </div>
                    }

                    <div className='profile--buttons'>
                        <button onClick={logout} className='profile--button' >Cerrar Sesion</button>
                    </div>
                </div>
            </section>
        </main>
    )
}


export default Profile