const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const csurf = require('csurf')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')

// require models
const User = require('./models/user')

const PORT = process.env.PORT || 3000

// DB constants
const { DB_USER = 'rumoren', DB_PASSWORD, DB_NAME } = process.env
// const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@node-complete-esmpc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@127.0.0.1:27017/${DB_NAME}`

const app = express()

// initialize session store which adds session object to each req
const sessionStore = new MongoDBStore({
  uri: MONGO_URI,
  collection: 'sessions',
})

sessionStore.on('error', err => console.error(err))

app.set('view engine', 'ejs')
app.set('views', 'views')

// use middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    secret: 'fear_thumb_disown_regime_refined',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
)

// Custom middleware to expose user in every request
app.use(async (req, res, next) => {
  if (req.session.isAuthenticated) {
    try {
      const email = req.session.user.email
      const user = await User.findOne({ email })
      req.user = user
    } catch (err) {
      console.error(err)
    }
  }

  next()
})

// CSRF protection middleware
const csrfProtection = csurf()
app.use(csrfProtection)

// use locals to pass arguments to every render function
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated
  res.locals.isAdmin = req.session && req.session.user && req.session.user.isAdmin
  res.locals.csrfToken = req.csrfToken()

  next()
})

// routes
app.use(authRoutes)
app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.get('/learn-more', (req, res, next) => {
  res.render('learn-more', { pageTitle: 'Learn more' })
})

// Generic 404 page
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})
;(async () => {
  try {
    const client = await mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    console.log('\nConnection to mongodb was successful! 🎉\n')

    const user = await User.findOne()
    if (!user) {
      console.log('User NOT found...\n')
      let newUser = new User({
        name: 'Joe Doe',
        email: 'joe@doe.com',
        cart: {
          products: [],
        },
      }).save()
    }
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}...\n`)
    })
  } catch (err) {
    console.error(err)
    throw err
  }
})()
