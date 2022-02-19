import {Routes, Route} from 'react-router-dom'
import './Home.css'
import Header from './Header/Header'
import ListProducts from './ListProducts/ListProducts'
import AddProduct from './AddProduct/AddProduct'
import ChangePrice from './ChangePrice/ChangePrice'


const Home = () => {

    return(
        <Routes>
            <Route path='/' element={ <Header /> }>
                <Route index element={ <ListProducts /> } />
                <Route path='addProduct' element={ <AddProduct /> } />
                <Route path='changePrice' element={ <ChangePrice /> } />
            </Route>
        </Routes>
    )
}


export default Home