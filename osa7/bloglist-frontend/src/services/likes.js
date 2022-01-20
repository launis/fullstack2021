import axios from 'axios'
const baseUrl = '/api/login'

const Likes = async  (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const updateUrl = baseUrl+`/${id}`
  const response = await axios.put(updateUrl, newObject, config)

  console.log('response.data' ,response.data)
  return response.data
}

export default Likes