const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const https = require("https");

require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "exp://192.168.0.13:8081",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.once("open", () => console.log("Connected to database"));
mongoose.connection.on("error", (error) =>
  console.log("Error has occured while being connected to database: ", error)
);

app.listen(3000, () => console.log("Server is running on port 3000."));
