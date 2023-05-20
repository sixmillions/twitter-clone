// token 状态管理
const useAuthToken = () => useState('auth_token', () => '')
// user 状态管理
const useAuthUser = () => useState('auth_user', () => { })

const setToken = (newToken) => {
  const token = useAuthToken()
  token.value = newToken
}

const setUser = (newUser) => {
  const user = useAuthUser()
  user.value = newUser
}

/**
 * 刷新 access token
 */
const refreshToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await $fetch('/api/auth/refresh')
      setToken(data.access_token)
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

const getUser = () => {
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

export default () => {
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
        // 保存到状态管理中
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

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      alert("initAuth")
      try {
        await refreshToken()
        await getUser()
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    login,
    useAuthToken,
    useAuthUser,
    initAuth
  }
}
