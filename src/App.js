import React from "react";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
