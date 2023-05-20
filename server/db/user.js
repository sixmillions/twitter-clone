import { prisma } from "."
import bcrypt from 'bcrypt'

export const createUser = (userData) => {
  const finalUserData = {
    ...userData,
    // bcrypt.hashSync(明文密码, 随机盐的长度)
    password: bcrypt.hashSync(userData.password, 10)
  }
  const user = prisma.user.create({
    data: finalUserData
  }).catch((error) => {
    console.error('db user: ', error);
  })
  return user
}

export const getUserByUsername = (username) => {
  const user = prisma.user.findUnique({
    where: {
      username
    }
  }).catch((error) => {
    console.error('db user: ', error);
  })
  return user
}

export const getUserById = (id) => {
  const user = prisma.user.findUnique({
    where: {
      id
    }
  }).catch((error) => {
    console.error('db user: ', error);
  })
  return user
}
