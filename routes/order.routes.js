
const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

// Show order
router.get('/order', (req, res) => {
    res.render('order');
});

router.post('/order', async (req, res) => {
    try {
        const { name, tableNo, order } = req.body;

        if (!name || !tableNo || !order) {
            return res.status(400).send("All fields are required!");
        }

        const newOrder = new Order({ name, tableNo, order });
        await newOrder.save();

        
        res.render('orderSuccess',{ name, tableNo, order });  

    } catch (err) {
        res.status(500).send("Error saving order: " + err.message);
    }
});

// Fetch all orders 
router.get('/admin/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.render("admin-orders", { orders });
    } catch (err) {
        res.status(500).send("Error fetching orders: " + err.message);
    }
});

// Update order status for Admin
router.post('/admin/orders/:id/update', async (req, res) => {
    try {
        const { status } = req.body;

        if (!['Pending', 'accepted', 'delivered'].includes(status)) {
            return res.status(400).send("Invalid status value");
        }

        const result = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        console.log("Updated order:", result);
        res.redirect('/admin/orders');
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to update status: " + error.message);
    }
});

// this is for an deleting an order
router.post('/admin/orders/:id/delete', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.redirect('/admin/orders');
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to delete order");
  }
});

module.exports = router;
