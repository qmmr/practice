// Render /login form
exports.login = async ({ isLoggedIn, isAdmin }, res, next) => {
  if (isLoggedIn) return res.redirect('/')

  res.render('auth/login', { pageTitle: 'Login', uri: '/login', isLoggedIn, isAdmin })
}

exports.handleLogin = async ({ body, session }, res, next) => {
  // TODO: Authenticate and redirect accordingly...
  // FIXME: FIX THIS :)
  if (body.email === 'joe@doe.com' && body.password === 'password') {
    // User is authenticated and isAdmin :D
    session.isLoggedIn = true
    session.isAdmin = true
    res.redirect('/')
  } else {
    res.render('auth/login', { pageTitle: 'Login', uri: '/login' })
  }
}
