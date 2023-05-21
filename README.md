# 链接

> 视频：https://www.youtube.com/watch?v=_cM4j9_LfQk&t=1053s&ab_channel=insidewebdev

> 仓库：https://github.com/insidewebdev/twitter-clone

> logo：https://gist.github.com/hassnian/a8ef7f243dcc933887b31af77e73df29

# bcrypt原理

前提：Hash不可逆

## 加密

1. 随机salt: xxxx
2. hash(原始密码 + xxxx) = 密文1
3. hash(密文1, xxxx) = 密文2
4. ...
5. hash((密文n-1), xxx) = 密文n

## 密文格式

```
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
\__/\/ \____________________/\_____________________________/
Alg Cost      Salt
```
2a: 算法的标识符，代表是 bcrypt 的版本，有 2a、2y、2b 三个版本。
10: 成本因子：代表轮询加密 2^10 = 1024 次。
N9qo8uLOickgx2ZMRZoMye: 16-byte (128-bit) 的 salt, 用 Radix-64 编码成为 22 个字符。
IjZAgcfl7p92ldGxad68LJZdL17lhWy: 24-byte (192-bit) 的 hash, 用 Radix-64 编码成为 31 个字符。

## 匹配过程

1. 数据库获取密文，解析得到 salt和加密次数
2. 对数据的密码按照上面的加密方式加密得到密文
3. 比较密文

## 优点

- 每次的 salt 是随机的生成的，不用担心 salt 会泄露
- 就算密文泄露，也无法推导出密码，因为hash不可逆

