const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

// const rootDir = require('./utils/root')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const PORT = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.get('/learn-more', (req, res, next) => {
  // console.log('rootDir', rootDir)
  // res.sendFile(path.join(__dirname, 'views', 'index.html'))
  res.render('learn-more', { pageTitle: 'Learn more' })
})

app.get('/', (req, res, next) => {
  // console.log('rootDir', rootDir)
  // res.sendFile(path.join(__dirname, 'views', 'index.html'))
  res.render('index', { pageTitle: 'Home page' })
})

// Generic 404 page
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`)
})
