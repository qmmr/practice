const Product = require('../models/product')

/** GET requests */
exports.products = async (req, res, next) => {
  // Render admin products
  const products = await Product.findAll({
    attributes: ['product_id', 'title', 'description', 'image_url', 'price'],
  })

  res.render('admin/products', {
    pageTitle: 'Admin :: Products',
    uri: '/admin/products',
    products,
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
  try {
    // Create product from POST request
    const { title, description, image_url, price } = req.body
    const product = await Product.create({ title, description, image_url, price })

    // TODO: Add Toast notification
    res.redirect('/admin/products')
  } catch (err) {
    console.error(err)
  }
}

// FIXME: This should be sent as PUT or PATCH request by JavaScript!!!
exports.updateProduct = async ({ params, body }, res, next) => {
  const { rows } = await Product.update(params.id, body)

  res.redirect('/admin/products')
}

// FIXME: This should be sent as DELETE request by JavaScript!!!
exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.destroy({ where: { product_id: req.params.id } })
  } catch (err) {
    console.error(`There was an error when trying to DELETE product with id: ${req.params.id}`, err)
  }

  res.redirect('/admin/products')
}
