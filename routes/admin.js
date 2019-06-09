const express = require('express')

const router = express.Router()

// GET /admin/users
router.get('/users', (req, res, next) => {
  console.log('GET /users')
  res.send(`
  <main>
    <h1>You are on /users page! 😉</h1>
    <form action="/admin/users" method="POST">
      <input type="text" name="username" />
      <button type="submit">Add user</button>
    </form>
  </main>`)
})

// POST /admin/users
router.post('/users', (req, res, next) => {
  // Create user by using username from body
  const { username } = req.body
  console.log(`User ${username} was created successfully! 🎉`)
  res.redirect('/')
})

module.exports = router
