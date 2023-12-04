import { RouterProvider } from "react-router-dom";
import ProviderLayout from "./ProviderLayout";
import { Router } from "./router";
import "./App.css";
import "./index.css";
import "@mantine/core/styles.css";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState(0);
  useEffect(() => {
  fetch("http://localhost:5173/")
    .then((res) => res.jason())
    .then((posts) => {
      console.log(posts);
      setPosts(posts);
  })
}, []);

  const router = Router();
  return (
    <ProviderLayout>
      <RouterProvider router={router} />
    </ProviderLayout>
  );
}

export default App;