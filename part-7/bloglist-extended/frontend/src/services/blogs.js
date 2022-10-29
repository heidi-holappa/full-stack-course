import axios from 'axios'
import userService from './user'
const baseUrl = '/api/blogs'

let token = null

const setToken = () => {
  token = userService.getToken()
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  setToken()

  const config = {
    headers: { Authorization: token },
  }
  console.log(
    `backend: creating blog, token ${config.headers.Authorization}, title: ${newObject.title}`
  )

  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const update = async (newObject) => {
  setToken()
  console.log(`backend: updating blog, token ${token}`)
  const config = {
    headers: { Authorization: token },
  }

  const updatedBlog = { ...newObject, likes: newObject.likes + 1 }

  const response = await axios.put(
    `${baseUrl}/${newObject.id}`,
    updatedBlog,
    config
  )

  return response.data
}

const remove = async (blogObject) => {
  setToken()
  const config = {
    headers: { Authorization: token },
  }
  console.log(`backend: removing blog, token ${token}`)

  const response = await axios.delete(`${baseUrl}/${blogObject.id}`, config)

  return response.data
}

export default { getAll, create, update, remove, setToken }
