//import './Banner.css'


const Banner = ({title}) => {
    return (
        <section className='section--container banner'>
            <div className='banner--img'></div>
            <h2 className='banner--title'>{title}</h2>
        </section>
    )
}


export default Banner