const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const productsController = require('../controllers/products-controller');

router.get('/', productsController.getProducts);
router.post(
  '/add',
  [
    body('name').not().isEmpty(),
    body('description').isLength({ min: 10 }),
    body('price').not().isEmpty(),
    body('imageURL').isURL(),
  ],
  productsController.addProduct
);
router.patch(
  '/edit/:pid',
  [body('description').isLength({ min: 10 }), body('price').not().isEmpty()],
  productsController.editProduct
);
router.delete('/delete/:pid', productsController.deleteProduct);

module.exports = router;
