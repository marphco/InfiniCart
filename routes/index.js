const router = require('express').Router();

// Import individual API route modules
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// Use API route modules with their respective base paths
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

// Export the configured router to be used in the main server setup
module.exports = router;
