const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { ObjectId } = require('mongodb')

const { connect, getDB } = require('./utils/db')
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
    const db = getDB()
    const collection = db.collection('users')
    const user = await collection.findOne({ _id: ObjectId('5d1c5af1bae3bb8123a4572b') })
    // Use User Model as instance
    req.user = new User(user)
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
    const client = await connect()
    console.log('Connection to mongodb was successful!')
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}...\n`)
    })
  } catch (err) {
    console.error(err)
    throw err
  }
})()
