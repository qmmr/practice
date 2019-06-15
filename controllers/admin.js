const Product = require('../models/product')

// GET
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

// POST
exports.createProduct = async (req, res, next) => {
  // Create product from POST request
  const product = new Product({ title: req.body.title })
  await product.save()

  // TODO: Add Toast notification
  console.log('Product was created successfully! 🎉')
  res.redirect('/admin/products')
}
