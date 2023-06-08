const express = require("express");
const router = express.Router();

const Data = require("../models/Data");

//Test
router.get('/test', function (req, res) {
    res.send('hello world')
})

//Return all data
router.get('/', async function (req, res) {
    const result = await Data.find({})
    res.send(result);
})


module.exports = router;