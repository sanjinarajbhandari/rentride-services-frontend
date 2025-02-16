import React, { useState } from "react";
import "../Login/Login.css";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className="main-wrapper">
      <div className="wrapper">
        <h1 className="font-semibold">Create Account</h1>
        <h2 className="text-yellow-500">{message}</h2>
        <form>
          <div className=" input-box">
            <input
              placeholder=" Name"
              className="border p-3 rounded-lg "
              type="text"
              id="name"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <FaUser className="icon" />
          </div>

          <div className=" input-box">
            <input
              placeholder="Email"
              className="border p-3 rounded-lg "
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className="icon" />
          </div>

          <div className=" input-box">
            <input
              placeholder="Password"
              className="border p-3 rounded-lg "
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>

          <div className=" input-box">
            <input
              placeholder="Confirm Password"
              className="border p-3 rounded-lg "
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FaLock className="icon" />
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
