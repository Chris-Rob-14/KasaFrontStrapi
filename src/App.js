import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import House from "./pages/House";
import Error from "./pages/Error";
import About from "./pages/About";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import "./App.css";

const HouseId = () => {
  const { id } = useParams();
  return <div>House {id}</div>;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/house/:id" element={<House />} />
          <Route path="/error" element={<Error />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
