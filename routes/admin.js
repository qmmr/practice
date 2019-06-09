const express = require('express')
const path = require('path')

const rootDir = require('../utils/root')

const router = express.Router()

// GET /admin/users
router.get('/users', (req, res, next) => {
  console.log('GET /users')
  res.sendFile(path.join(rootDir, 'views', 'users.html'))
})

// POST /admin/users
router.post('/users', (req, res, next) => {
  // Create user by using username from body
  const { username } = req.body
  console.log(`User ${username} was created successfully! 🎉`)
  res.redirect('/')
})

module.exports = router
