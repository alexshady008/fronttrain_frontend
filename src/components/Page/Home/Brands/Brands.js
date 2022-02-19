import { useState } from 'react'
//import './Brands.css'


const Brands = () => {

    return(
        <section className='section--container brands'>
            <h2> Nuestras marcas </h2>
            <div className='brands--container' > 
                <div className='brands brands--product inner--container'>
                    <h3> Productos </h3>
                    <picture className='brands--pictures products-img'>
                        <img src='/assets/brand/factories/Icsa.png' alt='Logo de Icsa' />
                        <img src='/assets/brand/factories/MS.png' alt='Logo de Ms Autopartes' />
                        <img src='/assets/brand/factories/Gomet.png' alt='Logo de Gomet' />
                        <img src='/assets/brand/factories/Locma.png' alt='Logo de Locma' />
                        <img src='/assets/brand/factories/MB.png' alt='Logo de MB Borguetti' />
                    </picture>
                </div>
                <div className='brands brands--cars'>
                    <h3> Autos </h3>
                    <picture className='brands--pictures cars-img'>
                        <img src='/assets/brand/cars/Ford.png' alt='Logo de Ford' />
                        <img src='/assets/brand/cars/Chevrolet.png' alt='Logo de Chevrolet' />
                        <img src='/assets/brand/cars/Fiat.png' alt='Logo de Fiat' />
                        <img src='/assets/brand/cars/Vw.png' alt='Logo de Volkswagen' />
                        <img src='/assets/brand/cars/Peugeot.png' alt='Logo de Peugeot' />
                        <img src='/assets/brand/cars/Renault.png' alt='Logo de Renault' />
                        <img src='/assets/brand/cars/Citroen.png' alt='Logo de Citroen' />
                        <img src='/assets/brand/cars/Toyota.png' alt='Logo de Toyota' />
                    </picture>
                </div>
            </div>
        </section>
    )
}


export default Brands