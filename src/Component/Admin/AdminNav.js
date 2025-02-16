import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { FaUser } from "react-icons/fa";
import "../Navbar/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="NavbarItem">
      <h1 className="font-bold text-xl">RentRide Services</h1>
      <div className="MenuIcons" onClick={toggleMenu}>
        <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={isMenuOpen ? "Navmenu active" : "Navmenu"}>
        <li>
          <Link className="NavLinks" to="/AdminVehicle">
            <i className="fas fa-car"></i> Vehicle
          </Link>
        </li>
        
        <li>
          <Link className="NavLinks" to="/AdminBooking">
            <i className="fas fa-list"></i> Bookings
          </Link>
        </li>
       
      </ul>

      <div className="corner-menu">
        <Link to="/Registration">
          <FaUser />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
