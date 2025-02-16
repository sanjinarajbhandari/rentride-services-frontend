import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className="main-wrapper">
      <div className="wrapper">
        <h1 className="font-semibold">Login</h1>
        <h2>{message}</h2>
        <form>
          <div className=" input-box">
            <input
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          <button className="change" type="submit">
            Login
          </button>

          <div className="register-link">
            <a onClick={() => navigate("/forgotP")}>Forgot Password?</a>
            <p>
              Don't have an account?
              <a href="/registration"> Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
