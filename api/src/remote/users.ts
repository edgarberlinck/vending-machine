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
