import axios from 'axios'


export const POSTrequest = async (url, data, config) => {
    try {
        console.log('Post Comenzado') 
        const response = await axios.post(url, data, config)    
        console.log('Post Finalizado' ,response) 
        return response
    } catch (error) {
        return new Error(error)
    }
}

export const GETrequest = async (url, data, config) => {
    try {
        console.log('Request Comenzado') 
        const response = await axios.get(url, data, config)    
        console.log('Request Finalizado' ,response) 
        return response
    } catch (error) {
        return new Error(error)
    }
}
