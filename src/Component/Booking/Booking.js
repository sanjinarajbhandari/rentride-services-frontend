import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Booking = ({ price, model, onClose }) => {
  const [userName, setUserName] = useState("");
  const [contact, setContact] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(true);
  const [khalti, setKhalti] = useState(false);

  const navigate = useNavigate()

  const handleKhalti = (e) => {
    e.preventDefault();
    setKhalti(true);
  };

  function handleClose() {
    setShowPopup(false);
    navigate('/vehicle')
    
  }

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg max-w-4xl relative">
            <button
              className="absolute top-0 right-0 px-4 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={handleClose}
            >
              <i className="fas fa-times" />
            </button>
            <h1 className="text-3xl font-semibold text-center my-9">
              Vehicle Booking
            </h1>
            <p className="text-l font-semibold">Model: {model}</p>
            <p className="text-l font-semibold">Price: ${price}</p>
            <br />
            <form className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-4 flex-1">
                <input
                  type="text"
                  placeholder="Username"
                  className="border p-3 rounded-lg"
                  maxLength="62"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />

                <input
                  type="Number"
                  placeholder="Contact Number"
                  className="border p-3 rounded-lg "
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
                <label>Check Out:</label>
                <input
                  type="date"
                  className="border p-3 rounded-lg "
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col flex-1 gap-4">
                <textarea
                  placeholder="Description"
                  className="border p-3 rounded-lg "
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

                <input
                  type="file"
                  accept="image/*"
                  className="border p-3 rounded-lg "
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />

                <button
                  onClick={handleKhalti}
                  className=" p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                  Pay with Khalti
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {khalti && <p className="text-center text-lg font-semibold">Khalti Payment Simulated</p>}
    </>
  );
};

export default Booking;
