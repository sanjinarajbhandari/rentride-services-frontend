import React, { useState } from "react";
import AdminNav from "./AdminNav";

import "./Admin_Vehicle.css";

const AdminVehicle = () => {
  // Static data for vehicles
  const initialVehicles = [
    {
      _id: "1",
      brand: "Toyota",
      model: "Corolla",
      price: "50",
      type: "sedan",
      power: "1500cc",
      fuel: "Petrol",
      description: "Reliable sedan with great fuel efficiency.",
      image: "https://via.placeholder.com/150",
    },
    {
      _id: "2",
      brand: "Honda",
      model: "Civic",
      price: "60",
      type: "sedan",
      power: "1800cc",
      fuel: "Diesel",
      description: "Sporty and stylish car with high performance.",
      image: "https://via.placeholder.com/150",
    },
  ];

  const [vehicles, setVehicles] = useState(initialVehicles);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [power, setPower] = useState("");
  const [fuel, setFuel] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [updateButton, setUpdateButton] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [vehicleId, setVehicleId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVehicle = {
      _id: Date.now().toString(), // Create a unique ID for the new vehicle
      brand,
      model,
      price,
      type,
      power,
      fuel,
      description,
      image: file ? URL.createObjectURL(file) : "https://via.placeholder.com/150", // Placeholder if no image
    };

    if (vehicleId) {
      // Update the vehicle
      setVehicles(vehicles.map((vehicle) =>
        vehicle._id === vehicleId ? newVehicle : vehicle
      ));
    } else {
      // Add the new vehicle
      setVehicles([...vehicles, newVehicle]);
    }

    // Reset form after submission
    setBrand("");
    setModel("");
    setPrice("");
    setType("");
    setPower("");
    setFuel("");
    setDescription("");
    setFile(null);
    setVehicleId("");
    setUpdateButton(false);
    setShowButton(false);
  };

  const remove = (id) => {
    setVehicles(vehicles.filter((vehicle) => vehicle._id !== id));
  };

  return (
    <>
      <AdminNav />
      <div className="V-heading">
        <button
          onClick={() => setShowButton(true)}
          className="mr-3 bg-white text-black border-4 border-black hover:bg-black hover:text-white hover:border-white font-bold py-1 px-2 rounded-xl"
        >
          <i className="fas fa-bag-shopping"></i> ADD
        </button>
      </div>
      {showButton && (
        <main className="border border-black rounded-lg p-3 max-w-4xl mx-auto my-10">
          <h1 className="text-3xl font-semibold text-center my-9">
            Vehicle Listing
          </h1>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 flex-1">
              <input
                type="text"
                placeholder="Brand"
                className="border p-3 rounded-lg"
                maxLength="62"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Model"
                className="border p-3 rounded-lg"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Power/CC"
                className="border p-3 rounded-lg"
                value={power}
                onChange={(e) => setPower(e.target.value)}
              />
              <div className="flex gap-6 flex-wrap">
                <h3>Fuel Type :</h3>
                <label>
                  <input
                    type="radio"
                    value="petrol"
                    checked={fuel === "petrol"}
                    onChange={(e) => setFuel(e.target.value)}
                  />
                  Petrol
                </label>
                <label>
                  <input
                    type="radio"
                    value="diesel"
                    checked={fuel === "diesel"}
                    onChange={(e) => setFuel(e.target.value)}
                  />
                  Diesel
                </label>
                <label>
                  <input
                    type="radio"
                    value="electric"
                    checked={fuel === "electric"}
                    onChange={(e) => setFuel(e.target.value)}
                  />
                  Electric
                </label>
              </div>
              <div className="flex gap-6 flex-wrap">
                <h3>Types :</h3>
                <label>
                  <input
                    type="radio"
                    value="suv"
                    checked={type === "suv"}
                    onChange={(e) => setType(e.target.value)}
                  />
                  SUV
                </label>
                <label>
                  <input
                    type="radio"
                    value="sedan"
                    checked={type === "sedan"}
                    onChange={(e) => setType(e.target.value)}
                  />
                  Sedan
                </label>
                <label>
                  <input
                    type="radio"
                    value="hatchback"
                    checked={type === "hatchback"}
                    onChange={(e) => setType(e.target.value)}
                  />
                  Hatchback
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="border p-3 border-grey-300 rounded-lg"
                  min="50"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
                <div>
                  <p className="text-l font-semibold">Price</p>
                  <span className="text-xs font-semibold">($ / Day)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <textarea
                type="text"
                placeholder="Description"
                className="border p-3 rounded-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <p className="font-semibold">Images:</p>
              <input
                className="p-3 border border-grey-300 rounded w-full"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                type="submit"
                className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                {updateButton ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </main>
      )}

      <div className="v-main">
        {vehicles.length ? (
          vehicles.map((vehicle) => (
            <div key={vehicle._id} className="v-inner">
              <div className="v-first">
                <img src={vehicle.image} alt={vehicle.brand} />
                <div className="text-center my-6">
                  <a
                    onClick={() => {
                      setVehicleId(vehicle._id);
                      setShowButton(true);
                      setUpdateButton(true);
                    }}
                    className="bg-slate-800 text-white border-2 border-white mr-2 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
                  >
                    UPDATE
                  </a>
                  <a
                    onClick={() => remove(vehicle._id)}
                    className="bg-red-500 ml-2 text-white border-2 border-white hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
                  >
                    DELETE
                  </a>
                </div>
              </div>
              <div className="v-second">
                <h3 className="text-xl font-bold text-center">{vehicle.model}</h3>
                <p><b>Brand: </b>{vehicle.brand}</p>
                <p><b>Type: </b>{vehicle.type}</p>
                <p><b>Power: </b>{vehicle.power}</p>
                <p><b>Fuel: </b>{vehicle.fuel}</p>
                <p><b>Price/Per day: </b>{vehicle.price}</p>
                <p><b>Description: </b>{vehicle.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="font-bold text-white">No vehicles found</p>
        )}
      </div>
    </>
  );
};

export default AdminVehicle;
