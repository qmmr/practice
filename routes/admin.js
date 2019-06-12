const express = require('express')

const router = express.Router()

const users = []

// GET /admin/users
router.get('/users', (req, res, next) => {
  // Render users
  res.render('users', { pageTitle: 'Admin :: Users', users })
})

// POST /admin/users
router.post('/users', (req, res, next) => {
  // Create user by using username from body
  const user = { username: req.body.username }
  users.push(user)
  // TODO: Add Toast notification
  console.log(`User ${user.username} was created successfully! 🎉`)

  res.redirect('/admin/users')
})

module.exports = router
