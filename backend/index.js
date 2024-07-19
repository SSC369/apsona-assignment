const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);
app.get("/", () => {
  res.json("Its working");
});
app.listen(3000, () => {
  console.log("Server is running on 3000 port");
});

const mongoUri = process.env.MONGODB_CONNECTION_LINK;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to mongo Successful");
  } catch (error) {
    console.log(error.message);
  }
};

connectToMongo();
