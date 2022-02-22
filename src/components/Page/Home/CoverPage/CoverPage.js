import './CoverPage.css'
import config from '../../../../config/config'


const CoverPage = ({title, buttonText}) => {
    const redirectToWhatsapp = `https://api.whatsapp.com/send/?phone=${config.numberAdmin}&text=Hola%2C+me+gustaria+encargar+un+pedido`
    //const redirectToWhatsapp_2 = `https://api.whatsapp.com/send/?phone=549113583-3475`

    return (
        <div className='coverPage--container'>
            <div className='coverPage--img'>
            <h1 className='coverPage--title'>{title}</h1>
            <a href={redirectToWhatsapp} className='coverPage--wsp button--wsp' > {buttonText} </a>
            </div>
        </div>
    )
}


export default CoverPage