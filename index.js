import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/db.js";
connectDB();
import express from "express";

const app = express();



app.get("/", (req, res) => {
  res.send("Bienvenidos a la API de Stacly!");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));