require("dotenv").config();

const port = process.env.SERVER_PORT;
const dbUrl = process.env.MONGODB_LOGIN_URL;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors({ origin: true, credentials: true }));
app.options("*", cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

app.use("/api/tictactoe", require("./routes/tictactoe"));

app.listen(port, () =>
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
);
