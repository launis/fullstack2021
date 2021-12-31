import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {  
    const response = await axios.post(baseUrl, Object.values(credentials)[0])
    return response.data
}

export default { login }