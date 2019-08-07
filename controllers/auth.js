const bcrypt = require('bcryptjs')

const User = require('../models/user')

/** GET */
// /login form
exports.login = async ({ isLoggedIn, isAdmin }, res, next) => {
  if (isLoggedIn) return res.redirect('/')

  res.render('auth/login', { pageTitle: 'Login', uri: '/login', isLoggedIn, isAdmin })
}

// /register form
exports.register = async ({ isLoggedIn, isAdmin }, res, next) => {
  if (isLoggedIn) return res.redirect('/')

  res.render('auth/register', { pageTitle: 'Register', uri: '/register', isLoggedIn, isAdmin })
}

/** POST */
exports.handleLogin = async ({ body, session }, res, next) => {
  // TODO: Authenticate and redirect accordingly...
  // FIXME: FIX THIS :)
  if (body.email === 'joe@doe.com' && body.password === 'password') {
    // User is authenticated and is an admin :D
    session.isLoggedIn = true
    session.isAdmin = true
    await Promise.resolve(() => {
      setTimeout(() => {
        console.log('...')
      }, 500)
    })
    res.redirect('/')
  } else {
    res.render('auth/login', { pageTitle: 'Login', uri: '/login' })
  }
}

exports.handleRegister = async ({ body, session: { isAdmin, isLoggedIn } }, res, next) => {
  const { email, password, 'password-confirm': confirmPassword } = body

  // TODO: Use proper validation...
  if (email && password === confirmPassword) {
    const hashedPassword = await bcrypt.hash(password, 12)
    try {
      const user = new User({
        email,
        password: hashedPassword,
      })
      await user.save()
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
