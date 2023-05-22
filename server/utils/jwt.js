import jwt from 'jsonwebtoken'
import exclude from '../excluding'

export const generateAccessToken = (user) => {
  const config = useRuntimeConfig()
  // console.log(111, config.jwtAccessTokenSecret);
  // console.log(222, config.jwtRefreshTokenSecret);
  // 将用户信息（密码除外）放到token中
  return jwt.sign({ userId: user.id, user: exclude(user, ['password']) }, config.jwtAccessTokenSecret, {
    expiresIn: '1m'
  })
}

export const generateRefreshToken = (user) => {
  const config = useRuntimeConfig()
  return jwt.sign({ userId: user.id }, config.jwtRefreshTokenSecret, {
    expiresIn: '4h'
  })
}

/**
 * 生成accessToken和refreshToken
 */
export const generateTokens = (user) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
  return {
    accessToken,
    refreshToken
  }
}

/**
 * 将refreshToken设置到浏览器的cookie中
 */
export const sendRefreshToken = (event, token) => {
  // https://www.jsdocs.io/package/h3#setCookie
  setCookie(event, 'refresh_token', token, {
    httpOnly: true, //如果某一个Cookie 选项被设置成 HttpOnly = true 的话，那此Cookie 只能通过服务器端修改，Js 是操作不了的
    sameSite: true
  })
}

export const decodeRefreshToken = (token) => {
  try {
    const config = useRuntimeConfig()
    return jwt.verify(token, config.jwtRefreshTokenSecret)
  } catch (error) {
    // 过期或者token不对
    return null
  }
}

export const decodeAccessToken = (token) => {
  try {
    const config = useRuntimeConfig()
    return jwt.verify(token, config.jwtAccessTokenSecret)
  } catch (error) {
    // 过期或者token不对
    return null
  }
}

