import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  console.log('backend: creating blog')
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const update = async (newObject) => {
  console.log('backend: updating blog')
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
  const config = {
    headers: { Authorization: token },
  }
  console.log('backend: removing blog')

  const response = await axios.delete(`${baseUrl}/${blogObject.id}`, config)

  return response.data
}

export default { getAll, create, update, remove, setToken }
