const express=require('express');
const app=express();
const dotenv= require('dotenv');
dotenv.config();

const connectToDB=require('./config/db');
connectToDB();

const userRouter=require('./routes/user.routes')

const orderRouter = require('./routes/order.routes');

const reservationRoutes = require('./routes/reservation.routes');


const methodOverride = require('method-override');


app.set('view engine','ejs');

app.use(express.json());//first middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));//second middleware

app.use('/user',userRouter);
app.use('/', orderRouter);
app.use('/', reservationRoutes);
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/contact',(req,res)=>{
    res.render('contact')
})
 
app.get('/order',(req,res)=>{
    res.render('order')
})

app.get('/reservation',(req,res)=>{
    res.render('reservation');
})

app.listen(3000,()=>
{
    console.log("server is running")
});