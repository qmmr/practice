const express = require('express')

const authCtrl = require('../controllers/auth')

const router = express.Router()

// GET /login
router.get('/login', authCtrl.login)

router.get('/register', authCtrl.register)

/** POST */
// login
router.post('/login', authCtrl.handleLogin)

router.post('/register', authCtrl.handleRegister)

// logout
router.post('/logout', authCtrl.logout)

module.exports = router
