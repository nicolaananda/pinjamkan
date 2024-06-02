import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useQuery } from "react-query";
import { bookServices } from "./services/bookServices";
import { useMutation, useQueryClient } from "react-query";
import { Toaster, toast } from "sonner";
const initialBook: IBook = {
  name: "",
  description: "",
  isbn: "",
  author: "",
  file: null,
};

export default function App() {
  const [book, setBook] = useState(initialBook);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["books"],
    queryFn: bookServices.getData,
  });

  const { mutate: handleAddBook } = useMutation(bookServices.createData, {
    onSuccess: () => {
      queryClient.invalidateQueries("books");
      toast.success("Buku Berhasil ditambahkan");
      setBook(initialBook);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  async function getData() {
    const res = await fetch("http://localhost:8000/books");
    const data = await res.json();
    getData(data);
  }

  // async function createData() {
  //   const res = await fetch("http://localhost:8000/books", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(book),
  //   });
  //   const data = await res.json();
  //   console.log(data);
  //   getData();
  //   setBook(initialBook);
  // }

  return (
    <div className="flex justify-center my-6">
      <main className="w-[400px] space-y-4">
        <h1 className="text-xl font-bold">Pinjamkan.</h1>
        {/* <div>
        {data.map((book: any) => {
          return <div key={book._id}>{book.name} </div>;
        })}
      </div> */}
        <section className="space-y-4">
          <Input
            value={book.name}
            placeholder="name"
            onChange={(e) => setBook({ ...book, name: e.target.value })}
          />
          <Input
            value={book.description}
            placeholder="description"
            onChange={(e) => setBook({ ...book, description: e.target.value })}
          />
          <Input
            value={book.isbn}
            placeholder="isbn"
            onChange={(e) => setBook({ ...book, isbn: e.target.value })}
          />
          <Input
            value={book.author}
            placeholder="author"
            onChange={(e) => setBook({ ...book, author: e.target.value })}
          />
          <Input
            type="file"
            onChange={(e) =>
              setBook({ ...book, file: e.target.files as FileList })
            }
          />
          <Button
            onClick={() => {
              handleAddBook(book);
            }}
          >
            Add book
          </Button>
        </section>
        {query.data?.length === 0 ? <div>Tidak ada data</div> : null}
        {query.isLoading ? <div>Loading...</div> : null}
        {query.isError ? (
          <div>Gangguan dari Server</div>
        ) : (
          <section>
            {query.data?.map((book: any) => {
              return (
                <div key={book._id}>
                  <div>{book.name}</div>
                  <div>{book.description}</div>
                  <div>{book.isbn}</div>
                  <div>{book.author}</div>
                </div>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}
