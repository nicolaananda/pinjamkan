import { Request, Response } from "express";
import { Book } from "../models/bookSchema";

export const bookController = {
  getData: async (req: Request, res: Response) => {
    const allBooks = await Book.find();
    return res.json(allBooks);
  },

  createData: async (req: Request, res: Response) => {
    const { name, description, isbn, author } = req.body;
    const createBook = new Book({ name, description, isbn, author });

    const saved = await createBook.save();
    return res.json({ message: "Buku Masuk", data: saved });
  },
};