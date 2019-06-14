const Product = require('../models/product')

exports.index = (req, res, next) => {
  // Render index page of the shop
  res.render('shop/index', { pageTitle: 'Buylando', uri: '/' })
}

exports.products = (req, res, next) => {
  // Render products available to buy
  res.render('shop/products', { pageTitle: 'Products', uri: '/products', products: Product.getAll() })
}

exports.cart = (req, res, next) => {
  // Render products in the cart
  res.render('shop/cart', { pageTitle: 'Cart products', uri: '/cart', products: Product.getAll() })
}

exports.checkout = (req, res, next) => {
  // Render checkout
  res.render('shop/checkout', { pageTitle: 'Checkout', uri: '/checkout', products: Product.getAll() })
}
