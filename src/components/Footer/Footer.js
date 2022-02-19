import './Footer.css'
import config from '../../config/config';


const Footer = () => {

    return(
        <footer className='footer--container'>
            <div className='footer--inner--container'>
                <picture className='footer--img'>
                    <img src='/logo.png' alt='logo' />
                </picture>
                <div className='footer--text'>
                    <p>011-3583-3475</p>
                    <p>fronttrain.contacto@gmail.com</p>
                </div>
            </div>
        </footer>
    )
}


export default Footer;
