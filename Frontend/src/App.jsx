import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BookConsultation from "./pages/BookConsultation";
import SelectDoctor from "./pages/SelectDoctor";
import Payment from "./pages/Payment";
import Consultation from "./pages/Consultation";
import Profile from "./pages/Profile";
import {Navbar} from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book" element={<BookConsultation />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/select-doctor" element={<SelectDoctor />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
       </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;