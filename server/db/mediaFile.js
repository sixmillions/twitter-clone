import { prisma } from "."

/**
 * 保存refresh token
 */
export const createMediaFile = (mediaFile) => {
  const file = prisma.mediaFile.create({
    data: mediaFile
  }).catch((error) => {
    console.error('db tweet createTweet: ', error);
  })
  return file
}
