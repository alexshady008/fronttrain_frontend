import { useState } from 'react'
//import './Testimonials.css'
import Testimonial from './Testimonial/Testimonial'


const nameClients = ['Tienda 1', 'Tienda 2', 'Tienda 3', 'Tienda 4', 'Tienda 5']
const descriptionClients = [
    'dkgds sdfjksdlgjhsd odjg idsjgkd lxgj klfdlkgjff jgfjfhg fjfgjfdj', 
    'fhdsghs dsgh sdgsagsd gdfgdf fgdfhgdfhdf dgfdh dhfdjftg dfhfdhfd', 
    'lksjgklsajg ksajklsdjgskdgj klsjgfkl sjgklsjg lksjgklsdgjkldsjg', 
    'Tjnvjsdfng jkshfjsakhfjaskf jkshfkjsahfjsk kjshfjksahf jskafhsjkfh', 
    'jsjksahdfjas jhadjkahdjakhd jkshjskhfjsak jshfsj']


const Testimonials = () => {
    const [loaded, setLoaded] = useState(true)
    const [testimonial, setTestimonials] = useState(0)
    const maxTestimonial = 4

    const previous = () => {
        setLoaded(false) 
        setTimeout(() => {
            if (testimonial>0) setTestimonials(testimonial-1)
            else setTestimonials(maxTestimonial)
            setLoaded(true)
        } , 500);
    }

    const next = () => {
        setLoaded(false) 
        setTimeout(() => {
            if (testimonial<maxTestimonial) setTestimonials(testimonial+1)
            else setTestimonials(0)
            setLoaded(true)
        } , 500);
    }

    return(
        <section className='section--container testimonials'>
            <h2> Los clientes dicen... </h2>
            <div className='testimonials--container inner--container' > 
            <button className='testimonials--button'   onClick={ previous } > {'<'} </button> 

                <Testimonial name={nameClients[testimonial]} 
                    description={descriptionClients[testimonial]}
                    className={ loaded ? 'testimonial testimonial--active' : 'testimonial testimonial--inactive' } />

            <button className='testimonials--button' onClick={ next } > {'>'} </button> 
            </div>
        </section>
    )
}


export default Testimonials