const Product = require('../models/product')

/** GET requests */
exports.products = async (req, res, next) => {
  // Render admin products
  res.render('admin/products', {
    pageTitle: 'Admin :: Products',
    uri: '/admin/products',
    products: await Product.getAll()
  })
}

exports.addProduct = (req, res, next) => {
  // Render admin add-product
  res.render('admin/add-product', { pageTitle: 'Admin :: Add Product', uri: '/admin/add-product' })
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
