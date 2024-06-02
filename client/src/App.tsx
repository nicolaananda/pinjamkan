import { useEffect } from "react";

export default function App() {
  async function getData() {
    const res = await fetch("http://localhost:8000");
    const data = await res.json();
    console.log(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Hello Pinjamkan</h1>
    </div>
  );
}
