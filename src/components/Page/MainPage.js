import './MainPage.css'
import {useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import Header from './Header/Header'
import Home from './Home/Home'
import Catalogue from './Catalogue/Catalogue'
import Contact from './Contact/Contact'
import Login from './Login/Login'
import Profile from './Profile/Profile'
import Register from './Register/Register'
import Order from './Order/Order'
import ChangePassword from './Login/RecoveryPass/ChangePassword/ChangePassword'
import UserConfirm from './UserConfirm/UserConfirm'
import UpdateProfile from './Profile/UpdateProfile/UpdateProfile'


const MainPage = () => {
    return(
      <main className='layout--container'>
        <Routes>
          <Route path='/' element={ <Header /> } >
            <Route index element={ <Home /> } />
            <Route path='/product' element={ <Catalogue /> } />
            <Route path='/contact' element={ <Contact /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/profile' element={ <Profile /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/order' element={ <Order /> } />
            <Route path='/updateProfile' element={ <UpdateProfile /> } />
            <Route path='/change-password' element={ <ChangePassword /> } />
            <Route path='/userConfirm/:userId' element={ <UserConfirm /> } />
          </Route>
        </Routes>
      </main>
    )
}


export default MainPage