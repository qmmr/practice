const Product = require('../models/product')
const Cart = require('../models/cart')

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

exports.productById = async (req, res, next) => {
  const id = req.params.id
  const product = await Product.findById(id)
  console.log('found product: ', product)
  res.render('shop/product-details', { pageTitle: 'Product details', uri: '/products', product })
}

exports.cart = async (req, res, next) => {
  // Render products in the cart
  const cartProductsIDs = await Cart.getProducts()
  const products = await Product.findByIDs(cartProductsIDs)
  res.render('shop/cart', { pageTitle: 'Cart products', uri: '/cart', products })
}

exports.orders = async (req, res, next) => {
  // Render orders
  const products = await Product.getAll()
  res.render('shop/orders', { pageTitle: 'Your orders', uri: '/orders', products })
}

exports.checkout = async (req, res, next) => {
  // Render checkout
  const products = await Product.getAll()
  res.render('shop/checkout', { pageTitle: 'Checkout', uri: '/checkout', products })
}

/** POST requests */
exports.addToCart = (req, res, next) => {
  // Add item to the cart
  const id = req.body.id
  Cart.add(id)
  // const product = Product.findById(id)
  // TODO: What to return?
  // TODO: How to deal with errors?
  res.redirect('/cart')
}
