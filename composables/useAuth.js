import jwt_decoded from 'jwt-decode'

export default () => {

  // token 状态管理
  const useAuthToken = () => useState('auth_token', () => '')
  // user 状态管理
  const useAuthUser = () => useState('auth_user', () => { })
  // loading 状态管理
  const useAuthLoading = () => useState('auth_loading', () => true)

  const setToken = (newToken) => {
    const token = useAuthToken()
    token.value = newToken
  }

  const setUser = (newUser) => {
    const user = useAuthUser()
    user.value = newUser
  }

  const setIsAuthLoading = (value) => {
    const authLoading = useAuthLoading()
    authLoading.value = value
  }

  /**
   * 刷新 access token
   */
  const refreshToken = () => {
    console.log('auth: refreshToken')
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/refresh')
        console.log('auth: fetch /refresh', data)
        debugger
        setToken(data.access_token)
        resolve(true)
      } catch (error) {
        console.log('auth: fetch /refresh error', error)
        reject(error)
      }
    })
  }

  const getUser = () => {
    console.log('auth: getUser')
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi('/api/auth/user')
        setUser(data.user)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 登录Twitter
   */
  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            username,
            password
          }
        })
        // accessToken保存到状态管理中
        setToken(data.access_token)
        setUser(data.user)
        console.log(111, data)
        resolve(true)
      } catch (error) {
        console.error('composables useAuth: ', error)
        reject(error)
      }
    })
  }

  /**
   * 刷新 accessToken的过期事件
   */
  const reRefreshAccessToken = () => {
    const authToken = useAuthToken()

    if (!authToken) {
      return
    }
    const jwt = jwt_decoded(authToken.value)

    const newRefreshTime = jwt.exp - 6000

    setTimeout(async () => {
      await refreshToken()
      reRefreshAccessToken()
    }, newRefreshTime)

  }

  /**
   * 初始化
   */
  const initAuth = () => {
    debugger
    console.log('auth: initAuth')
    return new Promise(async (resolve, reject) => {
      // alert("initAuth")
      setIsAuthLoading(true)
      try {
        await refreshToken()
        await getUser()
        reRefreshAccessToken()
        resolve(true)
      } catch (error) {
        console.log('auth: initAuth error', error)
        reject(error)
      } finally {
        setIsAuthLoading(false)
      }
    })
  }

  return {
    login,
    useAuthToken,
    useAuthUser,
    initAuth,
    useAuthLoading
  }
}
