import { User } from '../types'
import bcrypt from 'bcryptjs'
import client from './client'

export const create = async (user: Partial<User>): Promise<void> => {
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(user.password as string, salt)

  try {
    await client.post('/users', {
      username: user.username,
      password: passwordHash,
      role: user.role,
      status: 'published',
    })
  } catch (e) {
    console.dir(e)
    throw Error('Registration error')
  }
}

export const login = async (
  username: string,
  password: string
): Promise<User> => {
  try {
    const response = await client.get(
      `/users?filter[username][_eq]=${username}`
    )

    if (
      !response.data ||
      !response.data.data ||
      response.data.data.length === 0
    ) {
      throw new Error('invalid username/password')
    }

    const user: User = response.data.data[0]
    const match: boolean = await bcrypt.compare(
      password,
      user.password as string
    )

    if (match) {
      return user
    } else {
      throw new Error('invalid username/password')
    }
  } catch (e) {
    throw new Error('invalid username/password')
  }
}
