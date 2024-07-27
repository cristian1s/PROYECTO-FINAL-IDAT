const Stripe = require('stripe');
const { stripeSecretKey } = require('../config/config');
const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');
const Course = require('../models/courseModel');
const dotenv = require('dotenv');
dotenv.config();

const stripe = Stripe(stripeSecretKey);

const createCheckoutSession = async (req, res) => {
  const { cart, user } = req.body;
  
  const lineItems = cart.map(course => ({
    price_data: {
      currency: 'PEN',
      product_data: {
        name: course.nombre,
      },
      unit_amount: course.precio * 100, // Stripe maneja los precios en centavos
    },
    quantity: course.vacantes,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/success', // URL a la que se redirige después del pago
      cancel_url: 'http://localhost:5173/cancel',  // URL a la que se redirige si se cancela el pago
      //customer_email: user.correo, //  enviar correo del cliente 
      metadata: {
        userId: user.id, // Guardar ID del usuario
        cart: JSON.stringify(cart), // Guardar carrito
      },
    });
    console.log('Checkout session created:', { url: session.url });
    res.json({ id: session.id , url: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
};

// const handleWebhook = async (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     console.error('Verificación de firma fallida:', err);
//     return res.sendStatus(400);
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;

//     // Crear la orden en la base de datos
//     const userId = session.metadata.userId;
//     const cart = JSON.parse(session.metadata.cart);
//     const total = session.amount_total / 100; 

//     try {
//       const order = await Order.create({ userId, status: 'completed', total });
//       // Crear los items de la orden
//       await Promise.all(cart.map(async (course) => {
//         await OrderItem.create({
//           orderId: order._id, // Asegúrate de usar _id para MongoDB
//           courseId: course.id,
//           quantity: course.vacantes,
//           price: course.precio,
//         });

//         // Actualizar vacantes del curso
//         await Course.findByIdAndUpdate(course.id, {
//           $inc: { vacantes: -course.vacantes }
//         });
//       }));

//       // Agregar items a la orden
//       order.items = orderItems;
//       await order.save();
//     } catch (error) {
//       console.error('Error creating order:', error);
//     }
//   }

//   res.sendStatus(200);
// };
const completeOrder = async (req, res) => {
  const { cart, user } = req.body;

  const total = cart.reduce((acc, course) => acc + course.precio * course.vacantes, 0);

  try {
    // Crear la orden
    const order = await Order.create({
      userId: user._id,
      status: 'completed',
      total,
    });

    // Crear los artículos de la orden
    const orderItems = await Promise.all(cart.map(async (course) => {
      const orderItem = await OrderItem.create({
        orderId: order._id,
        courseId: course.id,
        quantity: course.vacantes,
        price: course.precio,
      });

      // Actualizar vacantes del curso
      const courseToUpdate = await Course.findById(course.id);
      courseToUpdate.vacantes -= course.vacantes;
      await courseToUpdate.save();

      return orderItem;
    }));

    // Actualizar la orden con los artículos
    order.items =  orderItems.map(item => ({
      courseId: item.courseId,
      quantity: item.quantity,
      price: item.price,
    })),
    await order.save();

    res.status(200).json({ message: 'Order completed successfully' });
  } catch (error) {
    console.error('Error completing order:', error);
    res.status(500).json({ error: 'Failed to complete the order' });
  }
};

module.exports = {
  createCheckoutSession,
  completeOrder,
};
