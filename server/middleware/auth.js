import UrlPattern from 'url-pattern'
import { decodeAccessToken } from '../utils/jwt'
import { sendError } from 'h3'
import { getUserById } from '../db/user'

/**
 * 所有路由都会走这里
 */
export default defineEventHandler(async (event) => {

  console.log('----------middleware auth------------', event.node.req.url)

  // 需要认证的url
  const endpoints = [
    '/api/auth/user'
  ]

  const isHandledByThisMiddleware = endpoints.some(endpoint => {
    const pattern = new UrlPattern(endpoint)
    return pattern.match(event.node.req.url)
  })

  if (!isHandledByThisMiddleware) {
    // 不需要判断权限url，直接返回
    return
  }

  console.log('----------need auth url------------', event.node.req.url)

  // authorization:Bear xxxxx
  const token = event.node.req.headers['authorization']?.split(' ')[1]

  const decode = decodeAccessToken(token)

  if (!decode) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    }))
  }

  try {
    // const user = await getUserById(decode.userId)
    const user = decode.user
    event.context.auth = { user }
  } catch (error) {
    console.log('middleware auth error', error);
  }

})
