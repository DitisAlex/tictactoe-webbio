require('dotenv').config()

const port = process.env.SERVER_PORT
const dbUrl = process.env.MONGODB_LOGIN_URL

const express = require("express")
const app = express();
const cors = require("cors")
const mongoose = require('mongoose')

// Initialize CORS
app.use(cors({ origin: true, credentials: true }));
app.options("*", cors({ origin: true, credentials: true }));

// Initialize routes
app.use("/api/tictactoe", require("./routes/tictactoe"))

// Initialize port
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
//   });

app.listen(port, () => mongoose.connect(dbUrl), {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
