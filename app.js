const express = require('express')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', (req, res, next) => {
  console.log('/users')
  res.send(`
  <main>
    <h1>You are on /users page! 😉</h1>
    <form action="/add-user" method="POST">
      <input type="text" name="username" />
      <button type="submit">Add user</button>
    </form>
  </main>`)
})

app.use('/add-user', (req, res, next) => {
  // Create user by using username from body
  const { username } = req.body
  console.log(`User ${username} was created successfully! 🎉`)
  res.redirect('/')
})

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from express.js! 👋</h1>')
})

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`)
})
