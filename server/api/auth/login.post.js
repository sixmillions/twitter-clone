// curl -X POST -i -H 'Content-Type:application/json' -d '{"email":"test@gmail.com","username":"six","password":"123456"}' localhost:3000/api/auth/login
import { getUserByUsername } from '../../db/user'
import bcrypt from 'bcrypt'
import { generateTokens } from '../../utils/jwt'
import exclude from '../../excluding'
import { createRefreshToken } from '../../db/refreshToken'

/**
 * 登录
 */
export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);
  if (!username || !password) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Invalid username or password', message: '请输入正确用户名密码' }))
  }

  //获取用户信息
  const user = await getUserByUsername(username)
  if (!user) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Invalid username or password', message: "用户名密码错误" }))
  }
  //校验密码
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Invalid username or password', message: "用户名密码错误" }))
  }

  //生成token: Access token/Refresh token
  const { accessToken, refreshToken } = generateTokens(user)

  // refreshToken保存到服务端（redis或者数据库）
  await createRefreshToken({
    token: refreshToken,
    userId: user.id
  })

  // refreshToken设置到cookie中
  // sendRefreshToken(event, refreshToken)

  // accessToken和用户信息返回给客户端
  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    user: exclude(user, ['password'])
  }
})
