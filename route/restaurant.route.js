const express = require('express');
const { RestaurantModel } = require('../model/restaurant.model');



const restaurantRouter = express.Router();

restaurantRouter.get('/restaurants', async (req, res) => {
    try {
        const data = await RestaurantModel.find();
        res.status(200).send({
            status: true,
            data: data
        })
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in fetching all the data of the restaurant.'
        })
    }
})

restaurantRouter.get('/restaurants/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await RestaurantModel.find({ _id: id });
        res.status(200).send({
            status: true,
            data: data
        })
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in fetching  the specific data of the restaurant.'
        })
    }
})


restaurantRouter.post('/restaurants', async (req, res) => {
    try {
        const { name, address, menu } = req.body;
        const addRestaurant = new RestaurantModel({ name, address, menu });
        await addRestaurant.save();
        res.status(200).send({
            status: true,
            msg: 'Your restaurant has been added.'
        })
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in adding the restaurant.'
        })
    }
})

restaurantRouter.post('/restaurants/:id/menu', async (req, res) => {
    try {
        const id = req.params.id;
        const { menu } = req.body;
        await RestaurantModel.updateOne({ _id: id }, { $push: { menu: menu } });
        res.status(200).send({
            status: true,
            msg: 'Your Menu has been Updated.',
            data: await RestaurantModel.find({ _id: id })
        })
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in adding data in the Menu.'
        })
    }
})
module.exports = { restaurantRouter };