//import axios from 'axios'
import config from '../../../../../config/config'

const List = ({brand, product}) => {
    const urlImg = `/assets/brand/factories/${brand}.png`
    const urlPDF = `${config.urlServerPdf}${brand}.pdf`

    return(
        <div className='list--container' >
            <div className='list--img-text'>
                <img src={urlImg} alt='Logo de la marca' />
               
            </div>
            <div className='list--pdf' >
            <p> {product} </p>
            <   a href={urlPDF}  download='Lista_de_precios.pdf'> Click para Ver </a>
            </div>
        </div>
    )
}


export default List