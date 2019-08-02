const express = require('express')

const authCtrl = require('../controllers/auth')

const router = express.Router()

// GET /login
router.get('/login', authCtrl.login)

// POST /login
router.post('/login', authCtrl.handleLogin)

module.exports = router
