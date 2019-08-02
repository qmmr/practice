// Render /login form
exports.login = async (req, res, next) => {
  res.render('auth/login', { pageTitle: 'Login', uri: '/login' })
}

exports.handleLogin = async ({ body }, res, next) => {
  console.log('req.body: ', body)
  // TODO: Authenticate and redirect accordingly...
  // FIXME: FIX THIS :)
  if (body.email === 'joe@doe.com' && body.password === 'password') {
    res.redirect('/')
  } else {
    res.render('auth/login', { pageTitle: 'Login', uri: '/login' })
  }
}
