import { IBook } from "@/types/entity";

export const bookServices = {
  getData: async () => {
    const res = await fetch("http://localhost:8000/books");
    const data = (await res.json()) as IBook[];
    return data;
  },
  createData: async ({ name, description, isbn, author }: IBook) => {
    if (!name || !description || !isbn || !author) {
      throw new Error("All fields are required");
    }

    const res = await fetch("http://localhost:8000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, isbn, author }),
    });

    const data = (await res.json()) as IBook;
    return data;
  },
};
