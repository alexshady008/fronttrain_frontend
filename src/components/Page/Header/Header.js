import './Header.css'
import {Link, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import config from '../../../config/config'
import { useState } from 'react'


const Header = () => {
    const [menu, setMenu] = useState(true)
    const redirectToWhatsapp = `https://api.whatsapp.com/send/?phone=${config.numberAdmin}&text=Hola%2C+me+gustaria+hacerte+una+consulta`
    const orderList = useSelector( state => state.order.productsList )

    const handleMenu = () => setMenu(!menu)

    return(
        <div>
            <div className='header--container'>
                
                <div className= { menu ? 'header--top header--active' : 'header--top header--inactive' } >
                    <picture className='header--logo'> 
                        <img src='/logo.png' alt='logo' />
                    </picture>
                    <nav className='header--nav'>
                        <Link to='/' className='navLink' > Inicio </Link>
                        <Link to='/product' className='navLink' > Catálogo </Link>
                        <Link to='/contact' className='navLink' > Contacto </Link>
                        {/* <Link to='/benefit' className='navLink' > Beneficios </Link> */}
                        { localStorage.getItem('session') 
                        ? 
                        <> 
                            <Link to='/profile' className='navLink' > Perfil </Link> 
                            <Link to='/order' className='navLink' > Mi Pedido <i>{orderList.length}</i>  </Link>
                            {/* { localStorage.getItem('client') && <Link to='/orders' className='navLink' > Pedidos </Link> } */}
                        </>
                        : 
                        <> 
                            <Link to='/login' className='navLink' > Iniciar Sesion </Link>
                            <Link to='/register' className='navLink' > Registrarse </Link> 
                        </> }
                    </nav>
                </div>

                <div className='header--down'>
                    <div className='header--menu-button'>
                        <picture onClick={handleMenu} >
                            <img src='/menu_button.png' alt='Logo de Whatsapp' />
                        </picture>
                    </div>
                    <div className='header--wsp-button'>
                        <a href={redirectToWhatsapp} className='button--wsp' >
                            <img src='/wsp_button.png' alt='Logo de Whatsapp' />
                        </a>
                    </div>
                </div>

            </div>

            <Outlet />
        </div>
    )
}


export default Header