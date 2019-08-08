const bcrypt = require('bcryptjs')

const User = require('../models/user')

/** GET */
// /login form
exports.login = async ({ isAuthenticated, isAdmin }, res, next) => {
  if (isAuthenticated) return res.redirect('/')

  res.render('auth/login', { pageTitle: 'Login', uri: '/login', isAuthenticated, isAdmin })
}

// /register form
exports.register = async ({ isAuthenticated, isAdmin }, res, next) => {
  if (isAuthenticated) return res.redirect('/')

  res.render('auth/register', { pageTitle: 'Register', uri: '/register', isAuthenticated, isAdmin })
}

/** POST */
exports.handleLogin = async (req, res, next) => {
  try {
    const { body, session } = req
    const user = await User.findOne({ email: body.email })
    const isAuthenticated = await bcrypt.compare(body.password, user.password)

    if (isAuthenticated) {
      session.isAuthenticated = true
      session.isAdmin = user.isAdmin
      session.user = {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      }
      return res.redirect('/')
    } else {
      return res.redirect('/login')
    }
  } catch (err) {
    console.error(err)
    return res.redirect('/login')
  }
}

exports.handleRegister = async (req, res, next) => {
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
