// Exclude keys from user
// https://www.prisma.io/docs/concepts/components/prisma-client/excluding-fields#excluding-the-password-field
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
