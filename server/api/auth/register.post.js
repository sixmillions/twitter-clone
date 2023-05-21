// 注册post请求
// curl -X POST -H 'Content-Type: application/json' -d '{"email":"test@gmail.com","username":"six","password":"123456","repeatPassword":"123456","name":"six"}' localhost:3000/api/auth/register
// https://www.jsdocs.io/package/h3#sendError
// import { sendError } from 'h3' // 自动引入 https://github.com/unjs/h3#utilities
import { createUser } from '../../db/user'
import exclude from '../../excluding'

/**
 * 用户注册api
 */
export default defineEventHandler(async (event) => {
  // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
  const body = await readBody(event);
  const { username, email, password, repeatPassword, name, avatar } = body

  if (!username || !email || !password || !repeatPassword || !name) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid username or password.', message: "无效的用户名密码" }))
  }

  if (password !== repeatPassword) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'The passwords you entered do not match.', message: "两次密码不一致" }))
  }

  try {
    // const userData = {
    //   email: 'liubw95@163.com',
    //   username: 'sixmillions',
    //   password: '000000',
    //   name: '百万',
    //   // https://picsum.photos/200/200
    //   avatar: 'https://pic3.zhimg.com/80/v2-911318ac58f4d15608e6b20a94834c3a_1440w.webp'
    // }

    const userData = {
      email,
      username,
      password,
      name,
      // 用户头像，可选
      avatar: avatar ? avatar : 'https://picsum.photos/200/200'
    }
    const newUser = await createUser(userData);
    // 去掉密码再返回结果
    return exclude(newUser, ['password'])
  }
  catch (error) {
    console.error(error);
    return sendError(event, createError({ statusCode: 400, statusMessage: 'create new user error.', message: "创建用户失败" }))
  }
});
