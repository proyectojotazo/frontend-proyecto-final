import axios from 'axios'

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 302) {
      return Promise.resolve(error.response.data)
    }
    if (!error.response) {
      return Promise.reject({ message: error.message })
    }
    return Promise.reject({
      ...error.response.data
    })
  }
)

export const setAuthorizationHeader = (token) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization']
}

export default client
