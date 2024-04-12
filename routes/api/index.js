const router = require('express').Router();
// Import the routers from each category
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// Define the route for each category. These will prepend `/api` to the paths defined within each router.
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

// Optional: Define a root route for the API to list available endpoints or provide a welcome message.
router.get('/', (req, res) => {
  res.json({
    message: "Welcome to the E-commerce API! Available endpoints: /categories, /products, /tags",
  });
});

// Catch-all for unmatched routes within /api
router.use('*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

module.exports = router;
