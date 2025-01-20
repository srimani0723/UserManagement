import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Home from "./Components/Home/Home";
import UserDetail from "./Components/UserDetail/UserDetail";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </>
  );
}

export default App;
