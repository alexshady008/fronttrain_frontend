const setOrderMessage = (listProducts, totalProducts, totalPrice) => {
    var msgProducts = ''
    listProducts.forEach( product => {
      let msgProduct = `+Código;+${product.cod}%2C+Marca;+${product.productBrand}%2C+Cantidad;+${String(product.quantity)}%2C+Precio;+$${String(product.price)}+%0A`
      msgProducts = msgProducts + msgProduct
    } )
  
    let text = `Hola%2C+queria+encargarte+el+siguiente+pedido:%0A%0A+PRODUCTOS:+%0A${msgProducts}%0A+PRODUCTOS+TOTALES:+%0A+${totalProducts}+%0A%0A+PRECIO+TOTAL:+%0A+$${totalPrice}`
    console.log('Text: ', text)
    return text
  }

  export default setOrderMessage