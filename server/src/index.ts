import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => res.json({ message: "Hello dari Server" }));

app.listen(8000);
