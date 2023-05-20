import { prisma } from "."
import bcrypt from 'bcrypt'

export const createUser = (userData) => {
  const finalUserData = {
    ...userData,
    // bcrypt.hashSync(明文密码, 随机盐的长度)
    password: bcrypt.hashSync(userData.password, 10)
  }
  return prisma.user.create({
    data: finalUserData
  })
}

export const getUserByUsername = (username) => {
  return prisma.user.findUnique({
    where: {
      username
    }
  })
}
