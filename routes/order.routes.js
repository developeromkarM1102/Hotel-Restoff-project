const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const checkLogin = require('./middleware/checkLogin');

// order page
router.get('/order', (req, res) => {
    res.render('order');
});

// order is submitting here
router.post('/order', checkLogin, async (req, res) => {
    try {
        const { name, tableNo, order } = req.body;

        if (!name || !tableNo || !order) {
            return res.status(400).send("All fields are required!");
        }

        // If user is logged in its save order directly
        const newOrder = new Order({
            name,
            tableNo,
            order,
            user: req.session.user ? req.session.user._id : null
        });

        await newOrder.save();

        res.render('orderSuccess', { name, tableNo, order });

    } catch (err) {
        res.status(500).send("Error saving order: " + err.message);
    }
});

// Fetching all orders to admin page
router.get('/admin/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: 1 });
        res.render("admin-orders", { orders });
    } catch (err) {
        res.status(500).send("Error fetching orders: " + err.message);
    }
});

// Updating order status in admin page
router.post('/admin/orders/:id/update', async (req, res) => {
    try {
        const { status } = req.body;

        if (!['pending', 'accepted', 'delivered'].includes(status)) {
            return res.status(400).send("Invalid status value");
        }

        await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.redirect('/admin/orders');
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to update status: " + error.message);
    }
});

// Deleting order from admin page
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
