const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const rootDir = require('../utils/root')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

const items = []

router.get('/cart', (req, res, next) => {
  // Return items in the cart
  // res.send({ items })
  res.sendFile(path.join(rootDir, 'views', 'shop.html'))
})

// POST /cart
router.post('/cart', (req, res, next) => {
  // Add item to the cart
  const { name, price } = req.body
  const quantity = parseInt(req.body.quantity, 10)
  // console.log(`name: ${name}, quantity: ${quantity}, price: ${price}`)

  const item = { name, quantity, price: quantity * parseFloat(price, 10) }
  items.push(item)

  res.status(200).send({ item })
})

module.exports = router
