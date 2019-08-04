// Render /login form
exports.login = async ({ isLoggedIn, isAdmin }, res, next) => {
  if (isLoggedIn) return res.redirect('/')

  res.render('auth/login', { pageTitle: 'Login', uri: '/login', isLoggedIn, isAdmin })
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

exports.logout = async (req, res, next) => {
  try {
    await req.session.destroy()
    res.redirect('/')
  } catch (err) {
    console.error(err)
  }
}
