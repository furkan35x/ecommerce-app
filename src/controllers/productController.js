const Product = require('../models/Product');

// Tüm ürünleri listele
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// Yeni ürün ekle
const addProduct = async (req, res) => {
  const { name, description, price, countInStock } = req.body;

  if (!name || !description || !price || countInStock == null) {
    return res.status(400).json({ message: 'Tüm alanlar gereklidir.' });
  }

  const product = new Product({
    user: req.user._id, // Ürünü ekleyen kullanıcı
    name,
    description,
    price,
    countInStock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// Ürün bilgilerini güncelle
const updateProduct = async (req, res) => {
  const { name, description, price, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Ürün bulunamadı.' });
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.countInStock = countInStock || product.countInStock;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
};

// Ürün sil
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Ürün bulunamadı.' });
  }

  await product.remove();
  res.json({ message: 'Ürün silindi.' });
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
