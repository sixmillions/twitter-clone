import { getRefreshTokenByToken } from '../../db/refreshToken'
import { verifyRefreshToken, decodeAccessToken } from '../../utils/jwt'
import { getUserById } from '../../db/user'

/**
 * 使用 refreshToken 刷新 accessToken
 *
 * curl -X 'POST' -H 'content-type:application/json' localhost:3000/api/auth/refresh
 *
 * curl -X 'POST' -H 'content-type:application/json' -d '{}' localhost:3000/api/auth/refresh
 *
 * curl -X 'POST' -H 'content-type:application/json' -d '{"refreshToken":"xxx"}' localhost:3000/api/auth/refresh
 *
 * curl -X 'POST' -H 'content-type:application/json' -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTY4NDc0Mjc2OSwiZXhwIjoxNjg0NzQyODI5fQ.ms9J1rEnpXEjfvvxNhbj9tlaJn4hNvRR4fvqXvmhaWk"}' localhost:3000/api/auth/refresh
 *
 * 测试第一遍，然后注释掉db判断测试第二遍
 * curl -X 'POST' -H 'content-type:application/json' -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MjY4NDg1Mjc2OSwiZXhwIjoyNjg0ODUyODI5fQ.1jKex03ocpwguuqWeBLfOgHC4hSvoY1rmeptxHENZCs"}' localhost:3000/api/auth/refresh
 *
 * curl -X 'POST' -H 'content-type:application/json' -d '{"accessToken":"xxx","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MjY4NDg1Mjc2OSwiZXhwIjoyNjg0ODUyODI5fQ.1jKex03ocpwguuqWeBLfOgHC4hSvoY1rmeptxHENZCs"}' localhost:3000/api/auth/refresh
 *
 * curl -X 'POST' -H 'content-type:application/json' -d '{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXIiOnsiaWQiOjcsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InNpeCIsIm5hbWUiOiJzaXgiLCJhdmF0YXIiOiJodHRwczovL3BpY3N1bS5waG90b3MvMjAwLzIwMCIsImNyZWF0ZWRBdCI6IjIwMjMtMDUtMThUMTA6NDI6MDYuNTU2WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDUtMThUMTA6NDI6MDYuNTU2WiJ9LCJpYXQiOjE2ODQ3NDI3NjksImV4cCI6MTY4NDc0MjgyOX0.pXoVMTQPHzCiJ7Rwmo9aZOjPXugRBqESH9e8u0oVHjE","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MjY4NDg1Mjc2OSwiZXhwIjoyNjg0ODUyODI5fQ.1jKex03ocpwguuqWeBLfOgHC4hSvoY1rmeptxHENZCs"}' localhost:3000/api/auth/refresh
 */
export default defineEventHandler(async (event) => {
  console.log('auth: /api/auth/refresh')
  // https://nuxt.com/docs/guide/directory-structure/server#accessing-request-cookies
  // const cookies = parseCookies(event)
  // cookie中获取 refreshToken （login的时候设置进去的）
  // const refreshToken = cookies.refresh_token

  const body = await readBody(event)

  if (!body) {
    console.log('auth: Empty Body')
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Empty Body'
    }))
  }

  const { refreshToken, accessToken } = body
  if (!refreshToken) {
    console.log('auth: 刷新accessToken时，refreshToken必填')
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'RefreshToken Is Invalid'
    }))
  }

  // refreshToken校验
  const refreshTokenPayload = verifyRefreshToken(refreshToken)
  if (!refreshTokenPayload || !refreshTokenPayload.userId) {
    console.log('auth: refreshToken过期或者无效，需要重新登录')
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'RefreshToken Is Invalid or Expired'
    }))
  }
  const { userId } = refreshTokenPayload

  // 验证refreshToken在不在我们数据库（虽然token自身就可以校验有效性，但是加这么一步，我们可以控制token失效情况）
  // 如果不想连接数据库,这步可以忽略
  const rToken = await getRefreshTokenByToken(refreshToken)

  if (!rToken) {
    console.log('auth: db没有该refreshToken')
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Refresh Token Does Not Exist'
    }))
  }

  // 获取user信息
  let user = null
  if (accessToken) {
    // 从accessToken的payload解析
    console.log('auth: accessToken不为空，从accessToken中获取user信息');
    const payload = decodeAccessToken(accessToken)
    user = payload?.user
  } else {
    //从数据库获取
    console.log('auth: accessToken为空，从db中获取user信息');
    user = await getUserById(userId)
  }

  if (!user) {
    console.log('auth: 找不到用户信息')
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Can not Find User'
    }))
  }


  try {
    const newAccessToken = generateAccessToken(user)
    return { access_token: newAccessToken }
  } catch (error) {
    console.error('refresh token error: ', error);
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Ooops Service Error'
    }))
  }
})
