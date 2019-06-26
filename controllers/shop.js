const Product = require('../models/product')
const Cart = require('../models/cart')

/** GET requests */
exports.index = (req, res, next) => {
  // Render index page of the shop
  res.render('shop/index', { pageTitle: 'Buylando', uri: '/' })
}

exports.products = async (req, res, next) => {
  // Render products available to buy
  const products = await Product.findAll({
    attributes: ['product_id', 'title', 'description', 'image_url', 'price'],
  })

  res.render('shop/products', { pageTitle: 'Products', uri: '/products', products })
}

exports.productById = async (req, res, next) => {
  const [product] = await Product.findAll({
    attributes: ['product_id', 'title', 'description', 'image_url', 'price'],
    where: {
      product_id: req.params.id,
    },
  })

  res.render('shop/product-details', { pageTitle: 'Product details', uri: '/products', product })
}

exports.cart = async (req, res, next) => {
  // Render products in the cart
  const cartProducts = await Cart.getProducts()
  const products = await Product.findByIDs(cartProducts)
  // In order to show quantity, we need to add cartProducts quantity to product object
  const combinedProducts = products.map(product => {
    const { quantity } = cartProducts.find(cProduct => cProduct.id === product.id)
    return { ...product, quantity }
  })

  res.render('shop/cart', { pageTitle: 'Cart products', uri: '/cart', products: combinedProducts })
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
