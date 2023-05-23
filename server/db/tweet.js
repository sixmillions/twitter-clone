import { prisma } from "."

/**
 * 保存refresh token
 */
export const createTweet = (tweetData) => {
  const token = prisma.tweet.create({
    data: tweetData
  }).catch((error) => {
    console.error('db tweet createTweet: ', error);
  })
  return token
}
