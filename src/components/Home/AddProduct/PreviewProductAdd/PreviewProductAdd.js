import {useSelector} from 'react-redux'
import config from '../../../../config/config'


const PreviewProductAdd = () => {
    const addProductDetails = useSelector( state => state.addProduct.details )
    const {id, cod, description, price, categoryId, productBrand, carBrand, carType, image} = addProductDetails
    let urlImage = 'assets/photo_product_default.png'
    if (image) {
        if ( (typeof image === 'string') && (image.includes('image-')) ) urlImage = `${config.urlServerDb}${image}`
        else urlImage = URL.createObjectURL(image)
    }
    //console.log('image: ' ,urlImage)
    

    return (
    <section className='section--container preview'>
        <h2> Previsualización del producto </h2>
        <div className='preview--container inner--container'>
            <p className='product--description'> Código: {cod} </p>
            <p className='product--description'> Description: {description} </p>
            <p className='product--price'> Precio: {price} </p>
            <p className='product--category'> Categoria: {categoryId} </p>
            <p className='product--brand'> Marca: {productBrand} </p>
            <p className='product--car-brand'> Auto: {carBrand} </p>
            <p className='product--car-type'> Tipo: {carType} </p>
            <img className='product--image' src={urlImage} alt='Producto' />
        </div>
    </section>
    )
}


export default PreviewProductAdd
