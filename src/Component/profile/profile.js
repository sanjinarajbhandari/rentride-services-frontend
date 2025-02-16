import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = {
    email: "user@example.com",
    role: "Admin",
  };

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="main-wrapper">
      <div className="wrapper">
        <h1 className="font-semibold">Profile</h1>
        {isLoggedIn ? (
          <div>
            <div>
              <p>Email: {user.email}</p>
              <br />
              <p>Role: {user.role}</p>
            </div>
            <br />
            <div>
              <button className="change" onClick={() => navigate("/changePassword")}>
                Change Password
              </button>
              <br />
              <br />
              <button className="sign" onClick={handleSignOut}>
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div>You have been signed out.</div>
        )}
      </div>
    </div>
  );
};

export default Profile;