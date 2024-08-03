const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');

const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).populate({
      path: 'items',
      populate: {
        path: 'courseId',
        model: 'Course',
        select : 'nombre'
      }
    }
    );

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

module.exports = { getOrdersByUser };
