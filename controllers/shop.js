const Product = require('../models/product')

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
