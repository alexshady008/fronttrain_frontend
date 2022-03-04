import './Header.css'
import {Link, Outlet} from 'react-router-dom'


const Header = () => {

    return(
        <div>
            <div className='header--top header--container' >
                <picture className='header--logo-container'> 
                    <img src='/Logo_menu.png' alt='logo' />
                </picture>
                {/* <h1 className='' >Dashboard</h1> */}
                <nav>
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