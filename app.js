const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()

app.use('/users', (req, res, next) => {
  console.log('/users')
  res.send('<h1>You are on /users page! 😉</h1>')
})

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from express.js! 👋</h1>')
})

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`)
})
