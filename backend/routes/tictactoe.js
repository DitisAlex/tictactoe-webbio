const express = require("express");
const router = express.Router();

//Return all items
router.get('/', function (req, res) {
    res.send('hello world')
})

module.exports = router;