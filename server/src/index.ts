import express from "express";

const app = express();

app.get("/", (req, res) => res.json({ message: "Hello dari Server" }));

app.listen(8000);
