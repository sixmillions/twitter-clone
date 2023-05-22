export default () => {

  /**
   * 状态管理 useState()
   * 组件实例创建时初始化
   * 可以被重新计算和渲染
   * 组件实例被销毁时，与此相关的状态也会被清除
   *
   * 例如，刷新页面就会销毁组件，初始化组件
   */
  // token(accessToken) 状态管理
  const useAuthToken = () => useState('auth_token', () => '')
  // user 状态管理
  const useAuthUser = () => useState('auth_user', () => { })
  // loading 状态管理
  const useAuthLoading = () => useState('auth_loading', () => true)

  const setToken = (newToken) => {
    // accessToken
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
   * 调用接口，刷新access token
   */
  const refreshToken = () => {
    // console.log('auth: refresh accessToken', localStorage.getItem('refresh_token'))
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/refresh', {
          method: 'POST',
          body: {
            accessToken: localStorage.getItem('access_token'),
            refreshToken: localStorage.getItem('refresh_token')
          }
        })
        // console.log('auth: fetch /refresh', data)
        setToken(data.access_token)
        localStorage.setItem('access_token', data.access_token)
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
      setIsAuthLoading(true)
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
        localStorage.setItem('access_token', data.access_token)
        setUser(data.user)
        // console.log(111, data)
        // refreshToken保存到localStorage中
        localStorage.setItem('refresh_token', data.refresh_token)
        resolve(true)
      } catch (error) {
        console.error('composables useAuth login error: ', error)
        reject(error)
      } finally {
        setIsAuthLoading(false)
      }
    })
  }

  /**
   * 刷新 accessToken，实现token延长
   * 这里设置的是9分钟，因为，token设置了10分钟有效期
   */
  const reRefreshAccessToken = () => {
    const authToken = useAuthToken()
    console.log('刷新accessToken过期时间', authToken.value);
    if (!authToken) {
      return
    }

    setTimeout(async () => {
      console.log("刷新accessToken过期时间")
      await refreshToken()
      reRefreshAccessToken()
    }, 9 * 60 * 1000)

  }

  /**
   * 初始化
   */
  const initAuth = () => {
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
