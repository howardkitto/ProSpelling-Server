const express = require('express');
var User = require('../models/user');

const router = new express.Router();

    router.get('/', function (req, res) {
        res.send('Hello World')
        })

    router.get('/api', function (req, res) {
        res.send('API root')
    });

module.exports = router;
