// Import Component
import List from "./components/List";
import Add from "./components/Add";
import Edit from "./components/Edit";

// Import dependency
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
