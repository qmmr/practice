const Product = require('../models/product')

exports.index = (req, res, next) => {
  // Render index page of the shop
  res.render('shop/index', { pageTitle: 'Buylando', uri: '/' })
}

exports.products = async (req, res, next) => {
  // Render products available to buy
  res.render('shop/products', { pageTitle: 'Products', uri: '/products', products: await Product.getAll() })
}

exports.cart = async (req, res, next) => {
  // Render products in the cart
  res.render('shop/cart', { pageTitle: 'Cart products', uri: '/cart', products: await Product.getAll() })
}

exports.checkout = async (req, res, next) => {
  // Render checkout
  res.render('shop/checkout', { pageTitle: 'Checkout', uri: '/checkout', products: await Product.getAll() })
}
