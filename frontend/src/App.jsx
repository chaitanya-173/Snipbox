import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Snippets from "./pages/Snippets";
import ViewSnippet from "./pages/ViewSnippet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/snippets" element={<Snippets />} />
          <Route path="/snippet/:id" element={<ViewSnippet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;