import axios from 'axios'

const instance = axios.create({
  // baseURL: process.env.API_URL,
})

// instance.defaults.headers.common['Authorization'] = `Bearer ${
//   process.env.DIRECTUS_USER_TOKEN as string
// }`

export default instance
