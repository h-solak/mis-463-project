const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const suggestionRoute = require("./routes/suggestion");

dotenv.config();
//middleware
app.use(express.json()); //body parser
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
//routes
app.use("/api/suggestion", suggestionRoute);

// Create GET request
app.get("/", (req, res) => {
  res.send("<h1>You shouldn't be here</h1>");
});

mongoose
  .connect(process.env.MONGO_URL, () => {
    console.log("connected to MongoDB");
    app.listen(8800, () => console.log("backend connected"));
  })
  .catch((err) => {
    console.log(err);
  });

//prevents from crashing after errors
process.on("uncaughtException", function (error) {
  console.log(error.stack);
});
