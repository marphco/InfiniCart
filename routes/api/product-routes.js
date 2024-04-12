const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Get all products with their associated Category and Tags
router.get('/', (req, res) => {
  Product.findAll({
    include: [{ model: Category }, { model: Tag, through: ProductTag }],
  })
  .then(products => res.json(products))
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: "Error fetching products", error: err.toString() });
  });
});

// Get one product by its ID with its associated Category and Tags
router.get('/:id', (req, res) => {
  Product.findByPk(req.params.id, {
    include: [{ model: Category }, { model: Tag, through: ProductTag }],
  })
  .then(product => {
    if (!product) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(product);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: "Error fetching product", error: err.toString() });
  });
});

// Create new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // Check if there are tag IDs to associate with the product
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return { product_id: product.id, tag_id };
        });
        return ProductTag.bulkCreate(productTagIdArr).then(() => product);
      }
      // If no product tags, return the product directly
      return product;
    })
    .then((product) => {
      // Respond with the product after handling tag associations (if any)
      res.status(200).json(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });
    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });

    if (req.body.tagIds) {
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter(tag_id => !productTagIds.includes(tag_id))
        .map(tag_id => ({ product_id: req.params.id, tag_id }));
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    const updatedProduct = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating product", error: err.toString() });
  }
});

// Delete one product by its `id` value
router.delete('/:id', (req, res) => {
  Product.destroy({ where: { id: req.params.id } })
    .then(product => {
      if (!product) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json({ message: 'Product was deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Error deleting product", error: err.toString() });
    });
});

module.exports = router;
