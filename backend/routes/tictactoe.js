const express = require("express");
const router = express.Router();

const Data = require("../models/Data");

//Return all game results
router.get("/", async function (req, res) {
  try {
    const result = await Data.find({});
    res.status(200).json(result);
  } catch (e) {
    res.status(404).json(e);
  }
});

//Post game result
router.post("/", async function (req, res) {
  try {
    await Data.create({ winner: req.body.winner, board: req.body.board });
    res.status(201).json("Game result successfully submitted");
  } catch (e) {
    res.status(400).json("Game results could not be submitted");
  }
});

module.exports = router;
