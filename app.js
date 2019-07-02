const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const connect = require('./utils/db')
const adminRoutes = require('./routes/admin')
// const shopRoutes = require('./routes/shop')

// require models
// const Product = require('./models/product')
// const User = require('./models/user')
// const Cart = require('./models/cart')
// const CartItem = require('./models/cart-item')
// const Order = require('./models/order')
// const OrderItem = require('./models/order-item')

const PORT = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: true }))

// Custom middleware to expose user in every request
// app.use(async (req, res, next) => {
//   try {
//     next()
//   } catch (err) {
//     console.error(err)
//   }
// })

app.use('/admin', adminRoutes)
// app.use(shopRoutes)

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
    const db = client.db()
    console.log('Connection to mongodb was successful!')
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}...\n`)
    })
  } catch (err) {
    console.error(err)
    throw err
  }
})()
