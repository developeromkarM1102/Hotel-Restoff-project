// models/order.model.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    tableNo: {
        type: String,
        required: true,
        trim: true
    },
    
    order:{
        type:String,
        required:true
    },
    
    status: {
        type: String,
        enum: ['pending', 'accepted', 'delivered'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
