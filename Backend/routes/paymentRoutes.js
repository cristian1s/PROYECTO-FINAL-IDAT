const express = require('express');
const { createCheckoutSession, completeOrder } = require('../controllers/paymentController');
const router = express.Router();

router.post('/payments/create-checkout-session', createCheckoutSession);
router.post('/payments/complete-order', completeOrder);

module.exports = router;
