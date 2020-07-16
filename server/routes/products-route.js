const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const productsController = require('../controllers/products-controller');
const checkAuth = require('../middlewares/check-auth');

router.get('/', productsController.getProducts);
router.get('/:pid', productsController.getProductById);
router.get('/uid/:uid', productsController.getProductsByUserId);

router.use(checkAuth);

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
