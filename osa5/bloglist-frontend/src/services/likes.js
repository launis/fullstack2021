import axios from 'axios'
const baseUrl = '/api/login'

const Likes = async  (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const updateUrl = baseUrl+`/${id}`
  console.log('updateUrl' ,updateUrl)
  console.log('newObject' ,newObject)
  console.log('config' ,config)
  const response = await axios.put(updateUrl, newObject, config)

  console.log('response.data' ,response.data)
  return response.data
}

export default Likes