const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation.model');
const checkAdmin = require('./middleware/checkAdmin');

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

router.get('/admin/reservation',checkAdmin, async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: 1 });
        res.render('admin-reservation', { reservations });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching reservations");
    }
});

router.post('/admin/reservation/:id/delete',checkAdmin, async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.redirect('/admin/reservation');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting reservation");
    }
});

module.exports = router;
