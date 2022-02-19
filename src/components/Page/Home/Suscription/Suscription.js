//import './Suscription.css'
import Mailchimp from 'react-mailchimp-form'


const Suscription = () => {
    const url = 'https://gmail.us5.list-manage.com/subscribe/post?u=06546bb487e14c8577efbc4ef&amp;id=b2671fab5d'
    const fieldsArray = [ { name: 'FNAME', placeholder: 'Nombre', type: 'text', required: true },
                        { name: 'LNAME', placeholder: 'Apellido', type: 'text', required: true },
                        { name: 'EMAIL', placeholder: 'Email', type: 'email', required: true } ]


    return(
        <section className='section--container suscription'>
            <h2> ¡Suscribirse para recibir ofertas y novedades! </h2>
            <div className='suscription--container inner--container'> 
                <Mailchimp 
                    action={url}
                    fields={fieldsArray}
                    className='form--container'
                    messages = {
                        {
                        sending: 'Enviando...',
                        success: '¡Gracias por suscribirse!',
                        error: '¡Ha ucurrido un error!',
                        empty: '¡Debes completar todos los campos!',
                        duplicate: 'Ya se ha suscribido alguien con este email',
                        button: 'Suscrbirse'
                        }
                    }
                />
            </div>
        </section>
    )
}


export default Suscription