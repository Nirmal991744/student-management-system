import React from "react";
import Navbar from "./Components/Navbar";
import CreateUser from "./Components/CreateUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllUsers from "./Components/AllUsers";
import Update from "./Components/Update";
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/allusers" element={<AllUsers />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </>
  );
}

export default App;
