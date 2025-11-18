const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation.model');

router.get('/reservation', (req, res) => {
    res.render('reservation'); 
});

router.post('/reservation', async (req, res) => {
    try {
        const { name, email, phone, guests, date, time, specialRequest } = req.body;

        const newReservation = new Reservation({
            name,
            email,
            phone,
            guests,
            date,
            time,
            specialRequest
        });

        await newReservation.save();

        res.render('reservationSuccess', { name,date,time });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving reservation");
    }
});

router.get('/admin/reservation', async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: 1 });
        res.render('admin-reservation', { reservations });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching reservations");
    }
});

module.exports = router;
