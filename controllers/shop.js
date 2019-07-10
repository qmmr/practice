const querystring = require('querystring')
const Product = require('../models/product')

/** GET requests */
// Render index page of the shop
exports.index = (req, res, next) => {
  res.render('shop/index', { pageTitle: 'Buylando', uri: '/' })
}

// Render all products available to buy
exports.products = async (req, res, next) => {
  const products = await Product.find()

  res.render('shop/products', { pageTitle: 'Products', uri: '/products', products })
}

exports.productById = async ({ params }, res, next) => {
  const product = await Product.findById(params.id)

  res.render('shop/product-details', { pageTitle: 'Product details', uri: '/products', product })
}

exports.cart = async ({ user }, res, next) => {
  try {
    // Fetch products stored as ids in cart.products array
    const { cart } = await user.populate('cart.products.product').execPopulate()

    res.render('shop/cart', { pageTitle: 'Cart products', uri: '/cart', products: cart.products })
  } catch (err) {
    console.error(err)
  }
}

// Render orders
exports.orders = async ({ user }, res, next) => {
  try {
    // TODO: Not implemented yet...
    const orders = []

    res.render('shop/orders', { pageTitle: 'Your orders', uri: '/orders', orders })
  } catch (err) {
    console.error(err)
  }
}

// Render checkout
exports.checkout = async ({ user, query }, res, next) => {
  const [order] = await user.getOrders({ where: { id: query.id }, include: ['products'] })

  res.render('shop/checkout', { pageTitle: 'Checkout', uri: '/checkout', order })
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
