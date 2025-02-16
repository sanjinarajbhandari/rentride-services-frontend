import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { FaUser } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <nav className="NavbarItem">
        <h1 className="text-2xl font-bold">RentRide Services</h1>
        <div className="MenuIcons" onClick={toggleMenu}>
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        <ul className={isMenuOpen ? "Navmenu active" : "Navmenu"}>
          <li>
            <Link className="NavLinks" to="/">
              <i className="fas fa-house"></i>Home
            </Link>
          </li>
          <li>
            <Link className="NavLinks" to="/Vehicle">
              <i className="fas fa-car"></i>Vehicle
            </Link>
          </li>
          <li>
            <form className="bg-slate-100 p-1.5 border-2 border-grey rounded-3xl flex ml-5 items-center">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent focus:outline-none w-20 sm:w-40"
                value={searchTerm}
              ></input>
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </li>
        </ul>

        <div className="corner-menu">
          <Link to="/profile">
            <FaUser />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;