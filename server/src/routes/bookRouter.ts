import express from "express";
import { bookController } from "../controllers/bookControllers";

export const bookRouter = express.Router();

bookRouter.get("/", bookController.getData);
bookRouter.post("/", bookController.createData);
