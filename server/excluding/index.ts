// Exclude keys from user
// 排除某些返回字段，例如密码
// 使用exclude(newUser, ['password'])
function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key]
  }
  return user
}

export default exclude
