//import './Testimonial.css'


const Testimonial = ({name, description, className}) => {
    return(
        <div className={className}>
            <h3 className='testimonial--name' > {name} </h3>
            <p className='testimonial--description'> {description} </p>
        </div>
    )
}


export default Testimonial