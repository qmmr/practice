const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

// const { connect, getDB } = require('./utils/db')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// require models
// const Product = require('./models/product')
const User = require('./models/user')
// const Order = require('./models/order')
// const OrderItem = require('./models/order-item')

const PORT = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: true }))

// Custom middleware to expose user in every request
app.use(async (req, res, next) => {
  try {
    const USER_ID = '5d29d20158314d27093f5e41'
    const user = await User.findById(USER_ID)
    req.user = user

    next()
  } catch (err) {
    console.error(err)
  }
})

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
    const { DB_USER = 'rumoren', DB_PASSWORD, DB_NAME } = process.env
    // const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@node-complete-esmpc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@127.0.0.1:27017/${DB_NAME}`
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
