const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const ordersController = require('../controllers/orders-controller');

router.get('/', ordersController.getOrders);
router.post(
  '/place',
  [
    body('items').not().isEmpty(),
    body('totalPrice').not().isEmpty(),
    body('address').not().isEmpty(),
    body('userId').not().isEmpty(),
  ],
  ordersController.placeOrder
);
router.patch(
  '/change/:oid',
  [body('status').not().isEmpty()],
  ordersController.editOrderStatus
);
router.delete('/delete/:oid', ordersController.deleteOrder);

module.exports = router;
