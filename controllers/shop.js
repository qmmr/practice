const querystring = require('querystring')
const Product = require('../models/product')
const Order = require('../models/order')

/** GET requests */
// Render index page of the shop
exports.index = (req, res, next) => {
  const isAdmin = req.isAdmin
  res.render('shop/index', { pageTitle: 'Buylando', uri: '/', isAdmin })
}

// Render all products available to buy
exports.products = async ({ isAdmin }, res, next) => {
  const products = await Product.find()

  res.render('shop/products', { pageTitle: 'Products', uri: '/products', products, isAdmin })
}

exports.productById = async ({ params }, res, next) => {
  const product = await Product.findById(params.id)

  res.render('shop/product-details', { pageTitle: 'Product details', uri: '/products', product })
}

exports.cart = async ({ user, isAdmin }, res, next) => {
  try {
    // Fetch products stored as ids in cart.products array
    const { cart } = await user.populate('cart.products.product').execPopulate()

    res.render('shop/cart', { pageTitle: 'Cart products', uri: '/cart', isAdmin, products: cart.products })
  } catch (err) {
    console.error(err)
  }
}

// Render orders
exports.orders = async ({ user, isAdmin }, res, next) => {
  try {
    // TODO: Not implemented yet...
    const orders = []

    res.render('shop/orders', { pageTitle: 'Your orders', uri: '/orders', isAdmin, orders })
  } catch (err) {
    console.error(err)
  }
}

// Render checkout
exports.checkout = async ({ user, query }, res, next) => {
  // TODO: How many orders to fetch?
  // FIXME: Checkout should render only one cart!!! This belongs to /orders...
  const orders = await Order.find({ user })
  orders.forEach(o => {
    console.log('checkout orders: ', o.products)
  })
  let populatedOrders = []

  for (let order of orders) {
    await order.populate('products.product').execPopulate()
    await order.populate('user').execPopulate()
    populatedOrders.push(order)
  }

  console.log('populated orders: ', populatedOrders)

  res.render('shop/checkout', { pageTitle: 'Checkout', uri: '/checkout', orders: populatedOrders })
}

/** POST requests */

// Add item to the cart
exports.addToCart = async ({ body, user }, res, next) => {
  try {
    await user.addToCart(body.id)

    res.redirect('/cart')
  } catch (err) {
    console.error(err)
  }
}

// Remove item from the cart
exports.removeFromCart = async ({ body, user }, res, next) => {
  try {
    await user.removeFromCart(body.id)

    res.redirect('/cart')
  } catch (err) {
    console.error(err)
  }
}

// Copy products in the current Cart to Checkout
exports.addToCheckout = async ({ user }, res, next) => {
  try {
    // Fetch products stored as ids in cart.products array
    const { cart } = await user.populate('cart.products.product').execPopulate()

    console.log('addToCheckout products: ', cart.products)
    // FIXME: This is wrong, the order should be created when "Order" button is clicked
    // This should only move products in the cart to the checkout page where user can decided how to pay, set address etc.
    // Create new Order...
    const order = await new Order({
      user,
      products: cart.products,
    }).save()

    const query = querystring.stringify({ id: order._id.toString() })

    // Clear the cart and redirect to checkout
    await user.clearCart()

    res.redirect('/checkout?' + query)
  } catch (err) {
    console.error(err)
  }
}
