import { prisma } from "."
import bcrypt from 'bcrypt'

/**
 * 创建用户
 */
export const createUser = (userData) => {
  const finalUserData = {
    ...userData,
    // bcrypt.hashSync(明文密码, 随机盐的长度)
    password: bcrypt.hashSync(userData.password, 10)
  }
  const user = prisma.user.create({
    data: finalUserData
  }).catch((error) => {
    console.error('db user createUser: ', error);
    throw error
  })
  return user
}

/**
 * 根据用户名查询用户信息
 */
export const getUserByUsername = (username) => {
  const user = prisma.user.findUnique({
    where: {
      username
    }
  }).catch((error) => {
    console.error('db user getUserByUsername: ', error);
  })
  return user
}

/**
 * 根据userId查询用户信息
 */
export const getUserById = (id) => {
  const user = prisma.user.findUnique({
    where: {
      id
    }
  }).catch((error) => {
    console.error('db user getUserById: ', error);
    throw error
  })
  return user
}
