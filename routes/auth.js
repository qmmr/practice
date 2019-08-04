const express = require('express')

const authCtrl = require('../controllers/auth')

const router = express.Router()

// GET /login
router.get('/login', authCtrl.login)

/** POST */
// login
router.post('/login', authCtrl.handleLogin)

// logout
router.post('/logout', authCtrl.logout)

module.exports = router
