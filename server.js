const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const https = require("https");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.once("open", () => console.log("Connected to database"));
mongoose.connection.on("error", (error) =>
  console.log("Error has occured while being connected to database: ", error)
);

app.listen(3000, () => console.log("Server is running on port 3000."));
