import jwt from 'jsonwebtoken'

const generateAccessToken = (user) => {
  const config = useRuntimeConfig()
  // console.log(111, config.jwtAccessTokenSecret);
  // console.log(222, config.jwtRefreshTokenSecret);
  return jwt.sign({ userId: user.id }, config.jwtAccessTokenSecret, {
    expiresIn: '10m'
  })
}

const generateRefreshToken = (user) => {
  const config = useRuntimeConfig()
  return jwt.sign({ userId: user.id }, config.jwtRefreshTokenSecret, {
    expiresIn: '4h'
  })
}

export const generateTokens = (user) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)


  return {
    accessToken,
    refreshToken
  }
}

export const sendRefreshToken = (event, token) => {
  setCookie(event, 'refresh_token', token, {
    httpOnly: true, //如果某一个Cookie 选项被设置成 HttpOnly = true 的话，那此Cookie 只能通过服务器端修改，Js 是操作不了的
    sameSite: true
  })
}

