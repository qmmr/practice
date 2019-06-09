const express = require('express')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')

const PORT = process.env.PORT || 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/admin', adminRoutes)

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from express.js! 👋</h1>')
})

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`)
})
