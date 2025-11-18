const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const connectToDB = require('./config/db');
connectToDB();

const session = require('express-session');

const userRouter = require('./routes/user.routes');
const orderRouter = require('./routes/order.routes');
const reservationRoutes = require('./routes/reservation.routes');

const methodOverride = require('method-override');

app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
}));


app.use('/user', userRouter);
app.use('/', orderRouter);
app.use('/', reservationRoutes);

app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/order', (req, res) => {
    res.render('order');
});

app.get('/reservation', (req, res) => {
    res.render('reservation');
});

app.get('/Login', (req, res) => {
    res.render('Login');
});

app.get('/newUser', (req, res) => {
    res.render('newUser');
});

app.get('/orderSuccess', (req, res) => {
    res.render('orderSuccess');
});

app.get('/LoginSuccess', (req, res) => {
    res.render('LoginSuccess');
});


app.listen(3000, () => {
    console.log("server is running");
});
