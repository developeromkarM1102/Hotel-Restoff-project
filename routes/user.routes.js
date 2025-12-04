const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');
const orderModel = require('../models/order.model'); 
const { body, validationResult } = require('express-validator');

router.get('/Login', (req, res) => {
    res.render("Login");
});


router.get('/newUser', (req, res) => {
    res.render('newUser');
});


router.post('/Login', async (req, res) => {
    const { email, password } = req.body;

    
    const user = await userModel.findOne({ email });

    if (!user) return res.send("Invalid email");
    if (user.password !== password) return res.send("Wrong password");

    req.session.user = user;

    if (req.session.pendingOrder) {

        const pending = req.session.pendingOrder;

        const order = new orderModel({
            name: pending.name,
            tableNo: pending.tableNo,
            order: pending.order,
            user: user._id
        });

        await order.save();
        delete req.session.pendingOrder;

        return res.render('orderSuccess', {
            name: order.name,
            tableNo: order.tableNo,
            order: order.order
        });
    }

    res.redirect('/');
});

router.post('/newUser', async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        if (!username || !email || !password) {
            return res.send("All fields are required");
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.send("User already exists");
        }

        const newUser = new userModel({
            username,
            email,
            password
        });

        await newUser.save();

        res.render("LoginSuccess", {
            name: newUser.name
        });

    } catch (err) {
        res.status(500).send("Error creating user: " + err.message);
    }
});


module.exports = router;
