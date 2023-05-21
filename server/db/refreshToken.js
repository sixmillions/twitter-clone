import { prisma } from "."

/**
 * 保存refresh token
 */
export const createRefreshToken = (refreshToken) => {
  const token = prisma.refreshToken.create({
    data: refreshToken
  }).catch((error) => {
    console.error('db token createRefreshToken: ', error);
  })
  return token
}


export const getRefreshTokenByToken = (refreshToken) => {
  const token = prisma.refreshToken.findUnique({
    where: {
      token: refreshToken
    }
  }).catch((error) => {
    console.error('db token getRefreshTokenByToken: ', error);
  })
  return token
}
