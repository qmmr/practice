const Product = require('../models/product')

/** GET requests */
exports.products = async (req, res, next) => {
  // Render user products
  try {
    const products = await Product.find()

    res.render('admin/products', {
      pageTitle: 'Admin :: Products',
      uri: '/admin/products',
      products,
    })
  } catch (err) {
    // TODO: Handle error
    console.error(err)
  }
}

// Render admin/add-product template
exports.addProduct = (req, res, next) => {
  res.render('admin/add-product', { pageTitle: 'Admin :: Add Product', uri: '/admin/add-product' })
}

// Render admin/edit-product template
exports.editProduct = async ({ params }, res, next) => {
  try {
    const product = await Product.findById(params.id)

    res.render('admin/edit-product', { pageTitle: 'Admin :: Edit Product', uri: '/admin/edit-product', product })
  } catch (err) {
    console.error(err)
  }
}

/** POST requests */
exports.createProduct = async (req, res, next) => {
  try {
    // Create product from POST request
    const { title, description, image_url, price } = req.body
    const product = new Product({ title, description, image_url, price })
    const result = await product.save()

    // TODO: Add Toast notification
    res.redirect('/admin/products')
  } catch (err) {
    console.error(err)
  }
}

// FIXME: This should be sent as PUT or PATCH request...
exports.updateProduct = async ({ params, body }, res, next) => {
  try {
    const { title, description, image_url, price } = body
    const product = await Product.findById(params.id)
    product.title = title
    product.description = description
    product.image_url = image_url
    product.price = price
    await product.save()

    res.redirect('/admin/products')
  } catch (err) {
    console.error(err)
  }
}

// FIXME: This should be sent as DELETE request...
exports.deleteProduct = async ({ params }, res, next) => {
  try {
    await Product.deleteOne(params.id)

    res.redirect('/admin/products')
  } catch (err) {
    console.error(`There was an error when trying to DELETE product with id: ${req.params.id}`, err)
  }
}
