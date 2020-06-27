const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const productsController = require('../controllers/products-controller');

router.get('/getProducts', productsController.getProducts);
router.post(
  '/addProduct',
  [
    body('name').not().isEmpty(),
    body('description').isLength({ min: 10 }),
    body('price').not().isEmpty(),
    body('imageURL').isURL(),
  ],
  productsController.addProduct
);
router.patch(
  '/editProduct/:pid',
  [body('description').isLength({ min: 10 }), body('price').not().isEmpty()],
  productsController.addProduct
);
router.delete('/deleteProduct', productsController.addProduct);

module.exports = router;
