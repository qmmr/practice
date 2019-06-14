const Product = require('../models/product')

// GET
exports.products = (req, res, next) => {
  // Render admin products
  console.log('products: ', Product.getAll())
  res.render('admin/products', { pageTitle: 'Admin :: Products', uri: '/admin/products', products: Product.getAll() })
}

exports.addProduct = (req, res, next) => {
  // Render admin add-product
  res.render('admin/add-product', { pageTitle: 'Admin :: Add Product', uri: '/admin/add-product' })
}

// POST
exports.createProduct = (req, res, next) => {
  // Create product from POST request
  const product = new Product({ title: req.body.title })
  product.save()
  console.log('Saving product...')
  // TODO: Add Toast notification
  console.log('Product was created successfully! 🎉')
  res.redirect('/admin/products')
}
