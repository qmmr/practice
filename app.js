const express = require('express')
const { Client } = require('pg')
const bodyParser = require('body-parser')
const path = require('path')

// const rootDir = require('./utils/root')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const PORT = process.env.PORT || 3000

const client = new Client()
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(async (req, res, next) => {
  await client.connect()
  const data = await client.query('SELECT $1::text as message', ['Hello world!'])
  console.log(data.rows[0].message) // Hello world!
  await client.end()
  next()
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

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`)
})
