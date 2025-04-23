import React, { useState, useEffect, useRef } from "react";
import "../Login/Login.css";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { defaults as defaultControls } from "ol/control";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationSelected, setLocationSelected] = useState(false);

  const mapRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const initialCoords = fromLonLat([
      longitude || 85.324,
      latitude || 27.7172,
    ]); // Default: Kathmandu

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      controls: defaultControls({ attribution: false }),
      view: new View({
        center: initialCoords,
        zoom: 13,
      }),
    });

    // Handle user map click
    map.on("click", function (evt) {
      const coords = toLonLat(evt.coordinate);
      setLongitude(coords[0]);
      setLatitude(coords[1]);
      setLocationSelected(true);
    });

    // If no user interaction yet, pre-select Kathmandu
    if (!locationSelected && latitude === null && longitude === null) {
      setLatitude(27.7172);
      setLongitude(85.324);
      setLocationSelected(true);
    }

    return () => map.setTarget(null);
  }, [latitude, longitude]);

  async function handleSubmit(e) {
    const namePattern = /^[A-Za-z\s]+$/;
    e.preventDefault();
    if (!latitude || !longitude || !name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
   
 
      if (!namePattern.test(name)) {
        toast.error("Name must contain only letters and spaces");
        return;
      }
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);     
      console.log("Name:", name);
      console.log("Email:", email); 
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);
    
    
    // return;
    const userData = {
      name,
      email,
      password,
      confirmPassword,
      latitude,
      longitude,
    };

    try {
      const response = await fetch("http://localhost:8081/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
  
      console.log("Response data:", data); // Log the response data
      toast.success("Registration Successful");
      setMessage(data.message);
      if (response.ok) navigate("/");
    } catch (error) {
      toast.error("Registration error");
      console.error(error);
    }
  }

  return (
    <div className="main-wrapper">
      <div className="wrapper">
        <h1 className="font-semibold">Create Account</h1>
        <h2 className="text-yellow-500">{message}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              placeholder="Name"
              className="border p-3 rounded-lg"
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input
              placeholder="Email"
              className="border p-3 rounded-lg"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className="icon" />
          </div>

          <div className="input-box">
            <input
              placeholder="Password"
              className="border p-3 rounded-lg"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          <div className="input-box">
            <input
              placeholder="Confirm Password"
              className="border p-3 rounded-lg"
              type="password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          <div className="text-start flex flex-col gap-2">
            <h3>Select your location:</h3>
            <div
              ref={mapRef}
              className="border h-[300px] w-full rounded-md mb-2"
            />
            {!locationSelected && (
              <p className="text-red-500">Please select your location.</p>
            )}
          </div>

          <button className="change" type="submit">
            Create Account
          </button>

          <div className="register-link">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
