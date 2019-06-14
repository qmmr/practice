const Product = require('../models/product')

exports.index = (req, res, next) => {
  // Render index page of the shop
  res.render('shop/index', { pageTitle: 'Buylando' })
}

exports.products = (req, res, next) => {
  // Render products available to buy
  res.render('shop/products', { pageTitle: 'Products', products: Product.getAll() })
}

exports.cart = (req, res, next) => {
  // Render products in the cart
  res.render('shop/cart', { pageTitle: 'Cart products', products: Product.getAll() })
}
