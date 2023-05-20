import { prisma } from "."

/**
 * 保存refresh token
 */
export const createRefreshToken = (refreshToken) => {
  return prisma.refreshToken.create({
    data: refreshToken
  })
}
