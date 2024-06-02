import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { bookRouter } from "./routes/bookRouter";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => console.log("DB Connected"))
  .catch(() => console.error("DB Error"));

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/books", bookRouter);
app.get("/", (req, res) => res.json({ message: "Hello dari Server" }));

app.listen(8000);
