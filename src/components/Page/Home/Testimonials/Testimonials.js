import { useState } from 'react'
//import './Testimonials.css'
import Testimonial from './Testimonial/Testimonial'


const nameClients = ['Tienda 1', 'Tienda 2', 'Tienda 3', 'Tienda 4', 'Tienda 5']
const descriptionClients = [
    'dkgds sdfjksdlgjhsd odjgidsjgkdlxgjklfdlkgjffjgfjfhgfjfgjfdj', 
    'fhdsghs dsghsdgsagsdgdfgdf fgdfhgdfhdf dgfdhdhfdjftg dfhfdhfd', 
    'lksjgklsajg ksajklsdjgskdgj klsjgfklsjgklsjg lksjgklsdgjkldsjg', 
    'Tjnvjsdfng jkshfjsakhfjaskf jkshfkjsahfjsk kjshfjksahfjskafhsjkfh', 
    'jsjksahdfjas jhadjkahdjakhd jkshjskhfjsak jshfsj']


const Testimonials = () => {
    const [loaded, setLoaded] = useState(false)
    const [testimonial, setTestimonials] = useState(0)
    const maxTestimonial = 4

    const previous = () => {
        setLoaded(false) 
        if (testimonial>0) setTestimonials(testimonial-1)
        else setTestimonials(maxTestimonial)
        setTimeout(() => setLoaded(true) , 500);
    }

    const next = () => {
        setLoaded(false) 
        if (testimonial<maxTestimonial) setTestimonials(testimonial+1)
        else setTestimonials(0)
        setTimeout(() => setLoaded(true) , 500);
    }

    return(
        <section className='section--container testimonials'>
            <h2> Los clientes dicen... </h2>
            <div className='testimonials--container inner--container' > 
            <button   onClick={ previous } > {'<'} </button> 

                <Testimonial name={nameClients[testimonial]} 
                    description={descriptionClients[testimonial]}
                    className={ loaded ? 'testimonial--active' : 'testimonial--inactive' } />

            <button onClick={ next } > {'>'} </button> 
            </div>
        </section>
    )
}


export default Testimonials