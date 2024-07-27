const express = require('express');
const { getOrdersByUser } = require('../controllers/orderController');
const router = express.Router();

router.get('/orders/user/:userId', getOrdersByUser);

module.exports = router;
