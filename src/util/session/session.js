import axios from "axios"
import config from '../../config/config'
import {userLogoutAction} from '../../redux/action/userAction'


export const checkSession = (dispatch, navigate) => {
    const interval = setInterval(() => {
        //console.log('Sesion comprobada: ')
        if (localStorage.getItem('session') && localStorage.getItem('token')) {
                const token = localStorage.getItem('token')
                const url = `${config.urlServer}/auth/checkSession`
                axios.get(url, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                })
                .then( response => {
                    const {data} = response
                    //console.log('Sesion comprobada: ', data)
                } )
                .catch( err => {
                    //console.log('Sesion cerrada!')
                    localStorage.removeItem('session')
                    localStorage.removeItem('token')
                    //clearInterval(interval)
                    dispatch( userLogoutAction() ) 
                    navigate('/admin')
                } )
        }
    }, config.intervalSesion);
    return interval
}


export const checkInterval = (cantInterval, interval) => {
    cantInterval.push(interval)
    if (cantInterval.length > 1) {
        //console.log('Eliminar interval')
        const intervalToDelete = cantInterval[cantInterval.length-1]
        clearInterval(intervalToDelete)
        cantInterval.pop()
      }
      return cantInterval
}