import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";
connectDB();

import express from "express";
import cors from "cors";

import toolRouter from "./src/routes/tool.router.js";
import authRouter from "./src/routes/auth.router.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos a la API de Stackly" });
});

app.use("/api/tools", toolRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));