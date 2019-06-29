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

// Add item to the cart
exports.addToCart = async ({ body, user }, res, next) => {
  const productId = body.id
  // First find the user's cart
  let cart = await user.getCart()
  // Find if the product is in the cart
  let [product] = await cart.getProducts({ where: { id: productId } })

  // Update quantity if product was found...
  if (product) {
    await cart.addProduct(product, { through: { quantity: parseInt(product.cartItem.quantity) + 1 } })
  } else {
    // No such product in the cart, let's add it...
    product = await Product.findByPk(productId)
    await cart.addProduct(product, { through: { quantity: 1 } })
  }

  // TODO: What to return?
  // TODO: How to deal with errors?
  res.redirect('/cart')
}

// Remove item from the cart
exports.removeFromCart = async ({ body, user }, res, next) => {
  const id = body.id
  console.log('\nid of the product we want to remove from the cart: ', id, '\n')
  // First find the user's cart
  let cart = await user.getCart()
  // Find if the product is in the cart
}
