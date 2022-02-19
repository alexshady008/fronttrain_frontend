import List from './List/List'


const ListPrices = () => {

    return(
        <section className='section--container listPrices'>
            <h2 >Listado de Precios PDF</h2>
            {/* <p className='listPrices--msg' > Aclaración: algunas listas de precios pueden estar desactualizadas. </p> */}
            <div className='listPrices--container inner--container'>
                <List brand='Icsa' product='bujes' />
                <List brand='MS' product='Rótulas - Extremos - Axiales - Bieletas' />
                <List brand='Gomet' product='bujes' />
                <List brand='Locma' product='Rótulas - Extremos - Axiales - Bieletas' />
                <List brand='MB' product='Parrillas' />
            </div>
        </section>
    )
}


export default ListPrices