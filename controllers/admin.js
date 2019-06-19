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

exports.addProduct = (req, res, next) => {
  // Render admin add-product
  res.render('admin/add-product', { pageTitle: 'Admin :: Add Product', uri: '/admin/add-product' })
}

exports.editProduct = async (req, res, next) => {
  // Render admin edit-product
  const product = await Product.findById(req.params.id)

  res.render('admin/edit-product', { pageTitle: 'Admin :: Edit Product', uri: '/admin/edit-product', product })
}

/** POST requests */
exports.createProduct = async (req, res, next) => {
  // Create product from POST request
  const { title, description, imageUrl, price } = req.body
  const product = new Product({ title, description, imageUrl, price })
  await product.save()

  // TODO: Add Toast notification
  console.log('Product was created successfully! 🎉')
  res.redirect('/admin/products')
}

// FIXME: This should be sent as PUT or PATCH request by JavaScript!!!
exports.updateProduct = async (req, res, next) => {
  console.log('TODO: update and save product...')
  console.log('req.params.id: ', req.params.id)
  console.log('req.body: ', req.body)
  // await Product.edit(req.params.id)

  res.redirect('/admin/products')
}

// FIXME: This should be sent as DELETE request by JavaScript!!!
exports.deleteProduct = async (req, res, next) => {
  await Product.delete(req.params.id)

  res.redirect('/admin/products')
}
