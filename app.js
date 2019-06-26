const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

// const rootDir = require('./utils/root')
const sequelize = require('./utils/db')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

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
    let user = await User.findByPk('aa72cf55-b9ae-4221-8867-c9799e707d16')
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
  console.log('Connection to postgres has been established!')
  app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}...`)
  })
} catch (err) {
  console.error(err)
}
