import './Admin.css'
import Home from '../Home/Home'
import Login from '../Login/Login'


const Admin = () => {
  console.log('Renderiza el Admin')

    return(
      <main className='admin--container'>
        { localStorage.getItem('session') ? <Home /> : <Login /> }
      </main>
    )
}


export default Admin