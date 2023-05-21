import { getRefreshTokenByToken } from '../../db/refreshToken'
import { getUserById } from '../../db/user'
import { decodeRefreshToken } from '../../utils/jwt'

/**
 * 使用 refreshToken 刷新 accessToken
 */
export default defineEventHandler(async (event) => {
  console.log('auth: /api/auth/refresh')
  // https://nuxt.com/docs/guide/directory-structure/server#accessing-request-cookies
  const cookies = parseCookies(event)
  // cookie中获取 refreshToken （login的时候设置进去的）
  const refreshToken = cookies.refresh_token

  if (!refreshToken) {
    console.log('auth: 无token')
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Refresh Token Is Invalid'
    }))
  }

  // 验证refreshToken有效性，在不在我们数据库（虽然token自身就可以校验有效性，但是加这么一步，我们可以控制token失效情况）
  const rToken = await getRefreshTokenByToken(refreshToken)

  if (!rToken) {
    console.log('auth: db没有该token')
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Refresh Token Is Invalid'
    }))
  }

  // 解析出 user数据
  const { userId } = decodeRefreshToken(refreshToken)

  try {
    // TODO 感觉不合理，这里为什么还要获取user信息？
    const user = await getUserById(userId)
    const accessToken = generateAccessToken(user)
    return { access_token: accessToken }
  } catch (error) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Ooops Service Error'
    }))
  }
})
