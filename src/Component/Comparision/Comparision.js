import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const Comparision = () => {
 
  const vehicles = [
    {
      model: "Car A",
      brand: "Brand A",
      type: "SUV",
      power: "200 HP",
      Fuel: "Petrol",
      price: "$50/day",
      description: "A great car for city and highway driving.",
      image: "car-a.jpg",
      review: ["Smooth ride", "Fuel efficient"],
    },
    {
      model: "Car B",
      brand: "Brand B",
      type: "Sedan",
      power: "180 HP",
      Fuel: "Diesel",
      price: "$40/day",
      description: "Comfortable and stylish sedan.",
      image: "car-b.jpg",
      review: ["Luxurious interior", "Good mileage"],
    },
  ];

  const [vehicle1, setVehicle1] = useState(vehicles[0]);
  const [vehicle2, setVehicle2] = useState(vehicles[1]);

  return (
    <>
      <Navbar />
      <div className="V-heading">
        <div>
          <a href="/compare" className="mr-3 bg-white text-black border-4 border-black hover:bg-black hover:text-white hover:border-white font-bold py-1 px-2 rounded-xl">
            <i className="fas fa-car"></i>Compare
          </a>
        </div>
        <div>
          <a href="/Vehicle" className="bg-white text-black border-4 border-black hover:bg-black hover:text-white hover:border-white font-bold py-1 px-2 rounded-xl">
            <i className="fas fa-car"></i>Vehicle
          </a>
        </div>
      </div>
      <div className="border border-black rounded-lg p-3 max-w-7xl mx-auto my-10">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <label className="font-semibold text-center">Choose First Vehicle: </label>
            <select className="border p-3 rounded-lg" onChange={(e) => setVehicle1(vehicles.find(v => v.model === e.target.value))}>
              {vehicles.map((vec, index) => (
                <option key={index} value={vec.model}>{vec.model}</option>
              ))}
            </select>
            {vehicle1 && (
              <div className="v-inner">
                <div className="v-first">
                  <img src={vehicle1.image} alt={vehicle1.brand} />
                </div>
                <div className="v-second">
                  <h3 className="text-xl font-bold text-center">{vehicle1.model}</h3>
                  <p><b>Brand: </b>{vehicle1.brand}</p>
                  <p><b>Type: </b>{vehicle1.type}</p>
                  <p><b>Power: </b>{vehicle1.power}</p>
                  <p><b>Fuel: </b>{vehicle1.Fuel}</p>
                  <p><b>Price/Per day: </b>{vehicle1.price}</p>
                  <p><b>Description: </b>{vehicle1.description}</p>
                  <div><b>Review: </b>
                    <ul>{vehicle1.review.map((s, index) => (<li key={index}> • {s}</li>))}</ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <label className="font-semibold text-center">Choose Second Vehicle: </label>
            <select className="border p-3 rounded-lg" onChange={(e) => setVehicle2(vehicles.find(v => v.model === e.target.value))}>
              {vehicles.map((vec, index) => (
                <option key={index} value={vec.model}>{vec.model}</option>
              ))}
            </select>
            {vehicle2 && (
              <div className="v-inner">
                <div className="v-first">
                  <img src={vehicle2.image} alt={vehicle2.brand} />
                </div>
                <div className="v-second">
                  <h3 className="text-xl font-bold text-center">{vehicle2.model}</h3>
                  <p><b>Brand: </b>{vehicle2.brand}</p>
                  <p><b>Type: </b>{vehicle2.type}</p>
                  <p><b>Power: </b>{vehicle2.power}</p>
                  <p><b>Fuel: </b>{vehicle2.Fuel}</p>
                  <p><b>Price/Per day: </b>{vehicle2.price}</p>
                  <p><b>Description: </b>{vehicle2.description}</p>
                  <div><b>Review: </b>
                    <ul>{vehicle2.review.map((s, index) => (<li key={index}> • {s}</li>))}</ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comparision;
