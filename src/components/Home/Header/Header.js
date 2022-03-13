import './Header.css'
import {Link, Outlet} from 'react-router-dom'


const Header = () => {

    return(
        <div>
            <div className='header--top header--container  header-admin' >
                <picture className='header--logo-container admin--header-logo'> 
                    <img src='/logo.png' alt='logo' />
                </picture>
                {/* <h1 className='' >Dashboard</h1> */}
                <nav className='admin-nav'>
                    <Link to='/admin' className='navLink' >Productos</Link>
                    <Link to='/admin/addProduct' className='navLink' >Añadir Producto</Link>
                    <Link to='/admin/changePrice' className='navLink' >Cambiar Precios</Link>
                </nav>
            </div>
            
            <Outlet />
        </div>
    )
}


export default Header