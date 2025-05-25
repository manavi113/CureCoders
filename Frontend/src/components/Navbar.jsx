import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (
  <nav className="bg-blue-600 text-white p-4 flex justify-between">
    <h1 className="font-bold text-xl">Telehealth</h1>
    <div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/meet">Meet</a></li>
        <li><a href="/room/:roomId">Room</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
         <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
      </ul>
    </div>
  </nav>
  );
};

export default Navbar;
