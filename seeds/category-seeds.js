const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Sweater',
  }
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
