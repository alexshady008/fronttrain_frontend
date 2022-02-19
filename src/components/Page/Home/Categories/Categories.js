import { useState } from 'react'
//import './Categories.css'
import Category from './Category/Category'


const Categories = () => {
    const catDefault = ['Bujes', 'Rotulas', 'Extremos', 'Bieletas','Axiales', 'Parrillas' ]
    const [categories, setCategories] = useState(catDefault)

    return (
        <section className='section--container categories'>
            <h2>Categorias</h2>
            <div className='categories--container inner--container'>
                { categories.map( (category, index) => 
                    <Category 
                        title={category} 
                        id={index+1} 
                        key={index} 
                    /> 
                ) }
            </div>
        </section>
    )
}


export default Categories