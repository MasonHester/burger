const express = require('express');
const burger = require('../models/burger.js');

const router = express.Router();

router.get('/', (req, res) => {
    burger.selectAll((data) => {
        const hbsBurgers = {
            burgers: data
        }

        res.render('index', hbsBurgers);
    });

    router.post('/burgers/create', (req, res) => {
        const burgerName = req.body.addBurger

        burger.insertOne(['burger_name'], [burgerName], () => {
            res.redirect('/');
        })
    });

    router.post('/burgers/:id', (req, res) => {
        const condition = req.params.id;
        
        burger.updateOne({
            devoured: true
        }, condition, () => {
            res.redirect('/');
        })
    });

    router.post('/delete/:id', (req, res) => {
        const condition = req.params.id;
        
        burger.updateOne({
            deleted: true
        }, condition, () => {
            res.redirect('/');
        })
    });

});

module.exports = router;