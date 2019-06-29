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
    attributes: {
      include: '*',
    },
  })

  res.render('shop/products', { pageTitle: 'Products', uri: '/products', products })
}

exports.productById = async (req, res, next) => {
  const [product] = await Product.findAll({
    attributes: ['id', 'title', 'description', 'image_url', 'price'],
    where: {
      id: req.params.id,
    },
  })

  res.render('shop/product-details', { pageTitle: 'Product details', uri: '/products', product })
}

exports.cart = async (req, res, next) => {
  try {
    const user = req.user
    let cart = await user.getCart()

    if (cart != null) {
      console.log('found cart for that user: ', cart.get({ plain: true }))
    } else {
      console.log('did not find cart, gotta create a new one...')
      cart = await user.createCart()
    }
    // Now the cart is available so we can fetch products...
    let products = await cart.getProducts()
    console.log('cart products: ', products)
    console.log('cartItem: ', products[0].cartItem.get({ plain: true }))

    res.render('shop/cart', { pageTitle: 'Cart products', uri: '/cart', products })
  } catch (err) {
    console.error(err)
  }
  // // In order to show quantity, we need to add cartProducts quantity to product object
  // const combinedProducts = products.map(product => {
  //   const { quantity } = cartProducts.find(cProduct => cProduct.id === product.id)
  //   return { ...product, quantity }
  // })
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
exports.addToCart = async ({ body, user }, res, next) => {
  // Add item to the cart
  const productId = body.id
  console.log('\nid of the product we want to add to the cart: ', productId, '\n')
  // First find the user's cart
  let cart = await user.getCart()
  // Find if the product is in the cart
  let products = await cart.getProducts({ where: { id: productId } })
  let product = products.length ? products[0] : null

  if (product) {
    console.log('product raw: ', product.get({ plain: true }))
  } else {
    // No such product in the cart, let's add it...
    product = await Product.findByPk(productId)
    console.log('product found by id: ', product.get({ plain: true }))
    await cart.addProduct(product, { through: { quantity: 1 } })
    console.log('product added to cart :+1:')
    res.redirect('/cart')
  }
  // TODO: What to return?
  // TODO: How to deal with errors?
}

exports.removeFromCart = async ({ body, user }, res, next) => {
  // Remove item from the cart
  const id = body.id
  console.log('\nid of the product we want to remove from the cart: ', id, '\n')
  // First find the user's cart
  let cart = await user.getCart()
  // Find if the product is in the cart
}
