import React, { useState } from "react";
import "./Vehicle.css";
import Navbar from "../Navbar/Navbar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Review2 from "../Review/Review2";
import Booking from "../Booking/Booking";

const vehicleData = [
  {
    _id: "1",
    image: "vehicle1.jpg",
    brand: "Brand A",
    model: "Model X",
    type: "SUV",
    power: "200 HP",
    Fuel: "Petrol",
    price: "5000",
    description: "A comfortable SUV with great mileage.",
    review: ["Great vehicle!", "Smooth ride."],
  },
  {
    _id: "2",
    image: "vehicle2.jpg",
    brand: "Brand B",
    model: "Model Y",
    type: "Sedan",
    power: "150 HP",
    Fuel: "Diesel",
    price: "4000",
    description: "A stylish sedan with excellent features.",
    review: ["Very efficient.", "Good handling."],
  },
];

const Vehicle = () => {
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [vehicleId, setVehicleId] = useState(null);

  const handleOpenReview = (id) => {
    setVehicleId(id);
    setShowReviewPopup(true);
  };

  const handleCloseBooking = () => {
    setShowReviewPopup(false);
    setVehicleId(null);
  };

  return (
    <>
      <Navbar />
      <div className="V-heading">
        <div>
          <a
            href="/Vehicle"
            className="mr-3 bg-white text-black border-4 border-black hover:bg-black hover:text-white hover:border-white font-bold py-1 px-2 rounded-xl"
          >
            <i className="fas fa-car"></i> Vehicle
          </a>
        </div>
        <div>
          <a
            href="/compare"
            className="bg-white text-black border-4 border-black hover:bg-black hover:text-white hover:border-white font-bold py-1 px-2 rounded-xl"
          >
            <i className="fas fa-car"></i> Compare
          </a>
        </div>
      </div>
      <div className="v-main">
        {showReviewPopup && (
          <Review2 vehicleId={vehicleId} onClose={handleCloseBooking} />
        )}
        
        {vehicleData.map((x) => (
          <div className="v-inner flex flex-col gap-4 flex-1" key={x._id}>
            <div className="v-first">
              <img src={x.image} alt={x.brand} />
              <div className="text-center my-6">
                <button
                  className="bg-black text-white border-2 border-white hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
                  onClick={() => handleOpenReview(x._id)}
                >
                  Add Review
                </button>
              </div>
            </div>
            <div className="v-second">
              <h3 className="text-xl font-bold text-center">{x.model}</h3>
              <p>
                <b>Brand: </b>
                {x.brand}
              </p>
              <p>
                <b>Type: </b>
                {x.type}
              </p>
              <p>
                <b>Power: </b>
                {x.power}
              </p>
              <p>
                <b>Fuel: </b>
                {x.Fuel}
              </p>
              <p>
                <b>Price/Per day: RS </b>
                {x.price}
              </p>
              <p>
                <b>Description: </b>
                {x.description}
              </p>
              <br />
              <div>
                <b>Review: </b>
                <ul>
                  {x.review.map((s, index) => (
                    <li key={index}>• {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-4 mx-4">
        <button
          className="bg-black text-white border-2 border-white hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-l"
          disabled
        >
          <FaArrowLeft />
        </button>
        <button
          className="bg-black text-white border-2 border-white hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-l"
          disabled
        >
          <FaArrowRight />
        </button>
      </div>
    </>
  );
};

export default Vehicle;
