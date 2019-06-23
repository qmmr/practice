const Product = require('../models/product')

/** GET requests */
exports.products = async (req, res, next) => {
  // Render admin products
  res.render('admin/products', {
    pageTitle: 'Admin :: Products',
    uri: '/admin/products',
    products: await Product.getAll(),
  })
}

// Render admin/add-product template
exports.addProduct = (req, res, next) => {
  res.render('admin/add-product', { pageTitle: 'Admin :: Add Product', uri: '/admin/add-product' })
}

// Render admin/edit-product template
exports.editProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  res.render('admin/edit-product', { pageTitle: 'Admin :: Edit Product', uri: '/admin/edit-product', product })
}

/** POST requests */
exports.createProduct = async (req, res, next) => {
  // Create product from POST request
  const { title, description, imageUrl, price } = req.body
  const product = new Product({ title, description, imageUrl, price })
  const savedProduct = await product.save()

  // TODO: Add Toast notification
  res.redirect('/admin/products')
}

// FIXME: This should be sent as PUT or PATCH request by JavaScript!!!
exports.updateProduct = async ({ params, body }, res, next) => {
  const { rows } = await Product.update(params.id, body)

  res.redirect('/admin/products')
}

// FIXME: This should be sent as DELETE request by JavaScript!!!
exports.deleteProduct = async (req, res, next) => {
  await Product.delete(req.params.id)

  res.redirect('/admin/products')
}
