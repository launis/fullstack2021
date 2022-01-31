/* eslint-disable linebreak-style */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const r = await axios.post(baseUrl, newObject, config)
  const updateUrl = baseUrl+`/${r.data.id}`
  const response = await axios.get(updateUrl, config)
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

const get = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const updateUrl = baseUrl+`/${id}`
  const response = await axios.get(updateUrl, config)
  return response.data
}


const exportedObject = {
  setToken,
  getAll,
  get,
  create,
  del,
  update }

export default exportedObject