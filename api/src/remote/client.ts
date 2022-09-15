import axios from 'axios'
import { config } from 'dotenv'

config()

const instance = axios.create({
  baseURL: process.env.DIRECTUS_BASE_URL,
})

instance.defaults.headers.common['Authorization'] = `Bearer ${
  process.env.DIRECTUS_USER_TOKEN as string
}`

export = instance
