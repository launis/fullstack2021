/* eslint-disable linebreak-style */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const del = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const updateUrl = baseUrl+`/${id}`
  const response = await axios.delete(updateUrl, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const updateUrl = baseUrl+`/${id}`
  const response = await axios.put(updateUrl, newObject, config)
  return response.data
}

const exportedObject = {
  setToken,
  getAll,
  create,
  del,
  update }

export default exportedObject