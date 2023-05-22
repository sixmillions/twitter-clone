import { getRefreshTokenByToken } from '../../db/refreshToken'
import jwt_decoded from 'jwt-decode'

/**
 * 使用 refreshToken 刷新 accessToken
 */
export default defineEventHandler(async (event) => {
  console.log('auth: /api/auth/refresh')
  // https://nuxt.com/docs/guide/directory-structure/server#accessing-request-cookies
  // const cookies = parseCookies(event)
  // cookie中获取 refreshToken （login的时候设置进去的）
  // const refreshToken = cookies.refresh_token
  const { refreshToken, accessToken } = await readBody(event);

  if (!refreshToken || !accessToken) {
    console.log('auth: refreshToken或者accessToken为空')
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Token Is Invalid'
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

  try {
    // TODO 感觉不合理，这里为什么还要获取user信息？
    // const user = await getUserById(userId)
    const payload = jwt_decoded(accessToken)
    const newAccessToken = generateAccessToken(payload.user)
    return { access_token: newAccessToken }
  } catch (error) {
    console.error('refresh token error: ', error);
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Ooops Service Error'
    }))
  }
})
