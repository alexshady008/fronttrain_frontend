import {Link, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
 import { useRef } from 'react';
import * as React from "react";


 
  
interface IMenuProps {
  menu: boolean;
}

export const Menu = ({ menu }: IMenuProps) => {
    

    let headerRef = useRef()
  console.log(headerRef);
  return (
         
                 <div  ref={headerRef} className= { menu ? 'header--top header--active' : 'header--top header--inactive' } >
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
  );
};


