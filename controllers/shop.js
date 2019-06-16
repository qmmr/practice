const Product = require('../models/product')

/** GET requests */
exports.index = (req, res, next) => {
  // Render index page of the shop
  res.render('shop/index', { pageTitle: 'Buylando', uri: '/' })
}

exports.products = async (req, res, next) => {
  // Render products available to buy
  const products = await Product.getAll()
  res.render('shop/products', { pageTitle: 'Products', uri: '/products', products })
}

exports.cart = async (req, res, next) => {
  // Render products in the cart
  const products = await Product.getAll()
  res.render('shop/cart', { pageTitle: 'Cart products', uri: '/cart', products })
}

exports.checkout = async (req, res, next) => {
  // Render checkout
  const products = await Product.getAll()
  res.render('shop/checkout', { pageTitle: 'Checkout', uri: '/checkout', products })
}

/** POST requests */
exports.addToCart = (req, res, next) => {
  // Add item to the cart
  // TODO: To be implemented
  res.status(200).send({})
}
