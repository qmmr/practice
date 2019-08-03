// Render /login form
exports.login = async ({ isLoggedIn, isAdmin }, res, next) => {
  if (isLoggedIn) return res.redirect('/')

  res.render('auth/login', { pageTitle: 'Login', uri: '/login', isLoggedIn, isAdmin })
}

exports.handleLogin = async ({ body, isAdmin }, res, next) => {
  // TODO: Authenticate and redirect accordingly...
  // FIXME: FIX THIS :)
  if (body.email === 'joe@doe.com' && body.password === 'password') {
    // User is authenticated and isAdmin :D
    // res.setHeader('Set-Cookie', 'isAdmin=true; Max-Age=60') cookie set for 60 seconds
    // res.setHeader('Set-Cookie', 'isAdmin=true')
    res.cookie('isAdmin', 'true', { expires: new Date(Date.now + 60000), httpOnly: true })
    res.cookie('isLoggedIn', 'true', { expires: new Date(Date.now + 60000), httpOnly: true })
    res.redirect('/')
  } else {
    res.render('auth/login', { pageTitle: 'Login', uri: '/login', isAdmin })
  }
}
