const { Product } = require('../models');

const productData = [
  {
    product_name: 'Crewneck',
    price: 200,
    stock: 100,
    category_id: 1,
  }
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
