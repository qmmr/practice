const bcrypt = require('bcryptjs')

const User = require('../models/user')

/** GET */
// /login form
// INFO: Cannot destructure due to issue with flash requiring session on req object...
exports.login = async (req, res, next) => {
  if (req.isAuthenticated) return res.redirect('/')
  const errors = req.flash('error')
  const errorMsg = errors.length ? errors[0] : null

  res.render('auth/login', { pageTitle: 'Login', uri: '/login', errorMsg })
}

// /register form
exports.register = async ({ isAuthenticated }, res, next) => {
  if (isAuthenticated) return res.redirect('/')

  res.render('auth/register', { pageTitle: 'Register', uri: '/register' })
}

/** POST */
exports.handleLogin = async (req, res, next) => {
  try {
    const { body, session } = req
    const user = await User.findOne({ email: body.email })

    // Stop if no use was found
    req.flash('error', 'Invalid credentials.')
    if (!user) return res.redirect('/login')

    const isAuthenticated = await bcrypt.compare(body.password, user.password)

    if (isAuthenticated) {
      session.isAuthenticated = true
      session.user = {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      }
      return res.redirect('/')
    } else {
      req.flash('error', 'Invalid credentials.')
      return res.redirect('/login')
    }
  } catch (err) {
    console.error(err)
    return res.redirect('/login')
  }
}

exports.handleRegister = async (req, res, next) => {
  // TODO: Flash message for validation
  const {
    body: { email, password, 'password-confirm': confirmPassword },
    session,
  } = req

  // TODO: Use proper validation...
  if (email && password === confirmPassword) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const user = new User({
        email,
        password: hashedPassword,
      })
      await user.save()
      session.isAuthenticated = true
      session.user = {
        _id: user._id,
        email: user.email,
        isAdmin: false,
      }
      res.redirect('/')
    } catch (err) {
      console.error(err)
    }
  } else {
    // TODO: Deal with the wrong form inputs...
    res.redirect('/register')
  }
}

exports.logout = async (req, res, next) => {
  try {
    await req.session.destroy()
    res.redirect('/')
  } catch (err) {
    console.error(err)
  }
}
