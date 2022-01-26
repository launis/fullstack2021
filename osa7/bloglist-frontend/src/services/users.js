import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {

  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {

  const r = await axios.post(baseUrl, newObject)
  const updateUrl = baseUrl+`/${r.data.id}`
  const response = await axios.get(updateUrl)
  return response.data
}

const get = async (id) => {

  const updateUrl = baseUrl+`/${id}`
  const response = await axios.get(updateUrl)
  return response.data
}


const exportedObject = {
  getAll,
  get,
  create,
}

export default exportedObject