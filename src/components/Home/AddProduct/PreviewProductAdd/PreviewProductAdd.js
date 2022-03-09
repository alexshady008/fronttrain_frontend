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
            <div className='preview--container2'>
                <p className='product--description preview'> Código: {cod} </p>
                <p className='product--description preview'> Description: {description} </p>
                <p className='product--price preview'> Precio: ${price} </p>
                <p className='product--category preview'> Categoria: {categoryId} </p>
                <p className='product--brand preview'> Marca: {productBrand} </p>
                <p className='product--car-brand preview'> Auto: {carBrand} </p>
                <p className='product--car-type preview'> Tipo: {carType} </p>
                <img className='product--image preview' src={urlImage} alt='Producto' />
            </div>
        </div>
    </section>
    )
}


export default PreviewProductAdd
