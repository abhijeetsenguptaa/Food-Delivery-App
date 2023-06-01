const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
})

const orderSchema = mongoose.Schema({
    userID: String,
    restaurantID: String,
    items: [itemSchema],
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    status: {
        type: String,
        enum: ["placed", "preparing", "on the way", "delivered"],
        default: "preparing"
    }
})


module.exports = { orderSchema };