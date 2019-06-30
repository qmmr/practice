const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const sequelize = require('./utils/db')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// require models
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

// Define association between models
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)

User.hasOne(Cart)
Cart.belongsTo(User) // Not needed as the above defines this relation

Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

// Order associations
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })

const PORT = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: true }))

// Custom middleware to expose user in every request
app.use(async (req, res, next) => {
  try {
    // INFO: user_id will change when table is altered!
    const USER_ID = '91e4907a-8e0c-45ec-87bf-341d3cbc57ef'
    let user = await User.findByPk(USER_ID)
    // Add user to every req
    req.user = user
    next()
  } catch (err) {
    console.error(err)
  }
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.get('/learn-more', (req, res, next) => {
  // res.sendFile(path.join(__dirname, 'views', 'index.html'))
  res.render('learn-more', { pageTitle: 'Learn more' })
})

// Generic 404 page
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

try {
  sequelize.authenticate()
  sequelize.sync()
  console.log('Connection to postgres has been established!\n')
  app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}...\n`)
  })
} catch (err) {
  console.error(err)
}
