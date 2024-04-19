const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//解决跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
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
      message: '用户名或密码错误'
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
      message: '用户未登录'
    })
  }
})
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
