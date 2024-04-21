const express = require('express')
const app = express()
const { _md5 } = require('./utils/md5')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//解决跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization,hashToken')
  next()
})
app.get('/login', (req, res) => {
  const { username, password } = req.query
  if (username === 'admin' && password === '123456') {
    res.send({
      code: 200,
      message: '登录成功',
      token: 'admin'
    })
  } else if (username === 'user' && password === '123456') {
    res.send({
      code: 200,
      message: '登录成功',
      token: 'user'
    })
  } else {
    res.send({
      code: 401,
      message: '用户名或密码错误',
      alert: true
    })
  }
})
app.get('/routes', (req, res) => {
  const { token } = req.query
  if (token === 'admin') {
    res.send({
      code: 200,
      message: '获取路由成功',
      routes: [
        {
          path: '/page1',
          name: 'Page1'
        },
        {
          path: '/page2',
          name: 'Page2'
        },
        {
          path: '/page3',
          name: 'Page3'
        },
        {
          path: '/page4',
          name: 'Page4'
        }
      ]
    })
  } else if (token === 'user') {
    res.send({
      code: 200,
      message: '获取路由成功',
      routes: [
        {
          path: '/page1',
          name: 'Page1'
        },
        {
          path: '/page2',
          name: 'Page2'
        }
      ]
    })
  } else {
    res.send({
      code: 401,
      message: '用户未登录',
      alert: true
    })
  }
})
app.get('/user/:id', (req, res) => {
  const { authorization, hashtoken } = req.headers
  console.log(authorization)
  if (!authorization || authorization == 'Bearer null')
    res.send({ code: 401, message: '用户未登录', alert: true })
  if (_md5(authorization) != hashtoken)
    res.send({ code: 401, message: 'token验证失败', alert: true })
  const { id } = req.params

  if (authorization == 'Bearer admin' && id == '24419') {
    res.send({
      code: 200,
      message: '获取用户信息成功',
      user: {
        id: 24419,
        username: 'admin',
        email: 'admin@example.com'
      }
    })
  } else {
    res.send({
      code: 401,
      message: '权限不足',
      alert: true
    })
  }
})
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
