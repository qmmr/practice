const querystring = require('querystring')
const Product = require('../models/product')

/** GET requests */
exports.index = (req, res, next) => {
  // Render index page of the shop
  res.render('shop/index', { pageTitle: 'Buylando', uri: '/' })
}

exports.products = async (req, res, next) => {
  // Render all products available to buy
  const products = await Product.find()

  res.render('shop/products', { pageTitle: 'Products', uri: '/products', products })
}

exports.productById = async ({ params }, res, next) => {
  const product = await Product.findById(params.id)

  res.render('shop/product-details', { pageTitle: 'Product details', uri: '/products', product })
}

exports.cart = async (req, res, next) => {
  try {
    const user = req.user
    const { products } = await user.getCart()

    res.render('shop/cart', { pageTitle: 'Cart products', uri: '/cart', products })
  } catch (err) {
    console.error(err)
  }
}

exports.orders = async ({ user }, res, next) => {
  try {
    // Render orders
    // TODO: Not implemented yet...
    const orders = []

    res.render('shop/orders', { pageTitle: 'Your orders', uri: '/orders', orders })
  } catch (err) {
    console.error(err)
  }
}

exports.checkout = async ({ user, query }, res, next) => {
  // Render checkout
  const [order] = await user.getOrders({ where: { id: query.id }, include: ['products'] })

  res.render('shop/checkout', { pageTitle: 'Checkout', uri: '/checkout', order })
}

/** POST requests */

// Add item to the cart
exports.addToCart = async ({ body, user }, res, next) => {
  try {
    const modifiedCount = await user.addToCart(body.id)

    if (modifiedCount === 1) {
      res.redirect('/cart')
    } else {
      console.error('modifiedCount error: ', modifiedCount)
    }
  } catch (err) {
    console.error(err)
  }
}

// Remove item from the cart
exports.removeFromCart = async ({ body, user }, res, next) => {
  try {
    let result = await user.removeFromCart(body.id)

    res.redirect('/cart')
  } catch (err) {
    console.error(err)
  }
}

exports.addToCheckout = async ({ user }, res, next) => {
  try {
    // Get products in the current Cart
    const cart = await user.getCart()
    const products = await cart.getProducts()
    // FIXME: This is wrong, the order should be created when "Order" button is clicked
    // This should only move products in the cart to the checkout page where user can decided how to pay, set address etc.
    // Create new Order...
    const order = await user.createOrder()

    // Add products from cart to order
    order.addProducts(
      products.map(product => {
        product.orderItem = {
          quantity: product.cartItem.quantity,
        }

        return product
      })
    )

    const query = querystring.stringify({ id: order.id })

    res.redirect('/checkout?' + query)
  } catch (err) {
    console.error(err)
  }
}
