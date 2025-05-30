import React, { useState, useEffect, useRef } from "react";
import AdminNav from "./AdminNav";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Admin_Vehicle.css";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { defaults as defaultControls } from "ol/control";
import { useSelector } from "react-redux";

const AdminVehicle = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [power, setPower] = useState("");
  const [fuel, setFuel] = useState("");
  const [description, setDescription] = useState("");
  const [file, setfile] = useState();
  const [vehicle, setVehicle] = useState([]);
  const [updateButton, setUpdateButton] = useState(false);
  const [showButton, setshowButton] = useState(false);
  const [vehicleId, setVehicleId] = useState("");
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 6;

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationSelected, setLocationSelected] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (!locationSelected) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setLocationSelected(true);
          },
          (error) => {
            console.warn("Location access denied:", error.message);
            // 🗺️ Default to Kathmandu
            setLatitude(27.7172);
            setLongitude(85.324);
            setLocationSelected(true);
          }
        );
      } else {
        console.warn("Geolocation not supported by this browser.");
        setLatitude(27.7172);
        setLongitude(85.324);
        setLocationSelected(true);
      }
    }
  }, []);

  const mapRef = useRef(null);

  useEffect(() => {
    if (latitude === null || longitude === null || !mapRef.current) return;

    const initialCoords = fromLonLat([longitude, latitude]);

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

    map.on("click", function (evt) {
      const coords = toLonLat(evt.coordinate);
      setLongitude(coords[0]);
      setLatitude(coords[1]);
      setLocationSelected(true);
    });

    return () => map.setTarget(null);
  }, [latitude, longitude, showButton]); // Add showButton here!

  async function fetchVehicle() {
    try {
      const response = await fetch("http://localhost:8081/admin/getVehicle", {
        credentials: "include",
      });
      const responseData = await response.json();
      setVehicle(responseData.vehicle);
    } catch (error) {
      toast.error("You are not admin", { position: "top-right" });
      navigate("/");
      console.error(error);
    }
  }

  useEffect(() => {
    fetchVehicle();
  }, []);

  // Fetch vehicle data to populate input fields if it's an update
  useEffect(() => {
    if (vehicleId) {
      const selectedVehicle = vehicle.find((v) => v._id === vehicleId);
      if (selectedVehicle) {
        setBrand(selectedVehicle.brand);
        setModel(selectedVehicle.model);
        setPrice(selectedVehicle.price);
        setType(selectedVehicle.type);
        setPower(selectedVehicle.power);
        setFuel(selectedVehicle.Fuel);
        setDescription(selectedVehicle.description);
      }
    }
  }, [vehicleId, vehicle]);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let data = [];

      if (!file && !vehicleId) {
        toast.error("Please select an image.");
        return;
      }

      let uploadedFilename = "";

      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const uploadResponse = await fetch(
          "http://localhost:8081/uploadVehicleImage",
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadData.error || "Failed to upload image");
        }

        uploadedFilename = uploadData.data;
      }

      const vehicleData = {
        brand,
        model,
        power,
        Fuel: fuel,
        price,
        type,
        description,
        image: uploadedFilename,
        latitude,
        longitude,
      };

      let response;
      if (vehicleId) {
        if (vehicleData.image === "") {
          toast.error("Please select an image.");
          return;
        }
        response = await fetch(
          `http://localhost:8081/admin/vehicle/${vehicleId}`,
          {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vehicleData),
          }
        );
      } else {
        response = await fetch("http://localhost:8081/createVehicle", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vehicleData),
        });
      }

      data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to process request");
      }

      toast.success(
        vehicleId
          ? "Vehicle updated successfully"
          : "Vehicle added successfully",
        { position: "top-right" }
      );

      // Reset form fields
      setBrand("");
      setModel("");
      setPrice("");
      setType("");
      setPower("");
      setFuel("");
      setDescription("");
      setfile(null);
      setVehicleId("");
      setUpdateButton(false);
      setshowButton(false);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  }

  // Delete a vehicle
  async function handleRemove() {
    try {
      const response = await fetch(
        `http://localhost:8081/Vehicle/${selectedVehicleId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to remove vehicle");
      }

      setVehicle((prevVehicleList) =>
        prevVehicleList.filter((vehicle) => vehicle._id !== selectedVehicleId)
      );

      toast.success("Vehicle removed successfully", { position: "top-right" });
      setShowRemoveModal(false);
      setSelectedVehicleId(null);
    } catch (error) {
      console.error(error);
      toast.error("Error removing vehicle", { position: "top-right" });
    }
  }

  // Get current vehicles for the current page
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicle.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-[calc(100vh-320px)]">
      <AdminNav />
      <div className="V-heading">
        <button
          onClick={() => setshowButton(true)}
          className="mr-3 bg-white text-black border-4 border-black hover:bg-black hover:text-white hover:border-white font-bold py-1 px-2 rounded-xl "
        >
          <i className="fas fa-bag-shopping"></i> ADD
        </button>
      </div>
      {showButton ? (
        <main className="border border-black rounded-lg p-3 max-w-4xl mx-auto my-10">
          <h1 className="text-3xl font-semibold text-center my-9">
            Vehicle Listing
          </h1>
          <form className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-4 flex-1">
              <input
                type="text"
                placeholder="Brand"
                className="border p-3 rounded-lg "
                id="brand"
                maxLength="62"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Model"
                className="border p-3 rounded-lg "
                id="model"
                name="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Power/CC"
                className="border p-3 rounded-lg "
                id="power"
                name="power"
                value={power}
                onChange={(e) => setPower(e.target.value)}
              />

              <div className="flex gap-6 flex-wrap">
                <h3>Fuel Type :</h3>
                <label>
                  <input
                    id="fuel"
                    name="fuel"
                    type="radio"
                    value="petrol"
                    onChange={(e) => setFuel(e.target.value)}
                    checked={fuel === "petrol"}
                  />
                  Petrol
                </label>
                <label>
                  <input
                    id="fuel"
                    name="fuel"
                    type="radio"
                    value="diesel"
                    onChange={(e) => setFuel(e.target.value)}
                    checked={fuel === "diesel"}
                  />
                  Diesel
                </label>
                <label>
                  <input
                    id="fuel"
                    name="fuel"
                    type="radio"
                    value="electric"
                    onChange={(e) => setFuel(e.target.value)}
                    checked={fuel === "electric"}
                  />
                  Electric
                </label>
              </div>

              <div className="flex gap-6 flex-wrap">
                <h3>Types :</h3>
                <label>
                  <input
                    id="type"
                    name="type"
                    type="radio"
                    value="suv"
                    onChange={(e) => setType(e.target.value)}
                    checked={type === "suv"}
                  />
                  SUV
                </label>
                <label>
                  <input
                    id="type"
                    name="type"
                    type="radio"
                    value="sedan"
                    onChange={(e) => setType(e.target.value)}
                    checked={type === "sedan"}
                  />
                  Sedan
                </label>
                <label>
                  <input
                    id="type"
                    name="type"
                    type="radio"
                    value="hatchback"
                    onChange={(e) => setType(e.target.value)}
                    checked={type === "hatchback"}
                  />
                  Hatchback
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="border p-3 border-grey-300 rounded-lg "
                  id="price"
                  min="50"
                  maxLength="8"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
                <div>
                  <p className="text-l font-semibold">Price</p>
                  <span className="text-xs font-semibold">(Rs. / Day)</span>
                </div>
              </div>

              <p className="text-sm font-semibold mt-4">
                Select Location on Map:
              </p>
              <div
                ref={mapRef}
                className="w-full h-64 border border-gray-400 rounded-md"
              ></div>
              <p className="text-sm text-gray-500">
                Selected Location: {latitude?.toFixed(5)},{" "}
                {longitude?.toFixed(5)}
              </p>
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <textarea
                type="text"
                placeholder="Description"
                className="border p-3 rounded-lg "
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <p className="t font-semibold">Images:</p>
              <div>
                <input
                  className="p-3 border border-grey-300 rounded w-full"
                  type="file"
                  id="images"
                  accept="image/*"
                  filename={file}
                  onChange={(e) => setfile(e.target.files[0])}
                />
              </div>
              <button
                onClick={handleSubmit}
                className=" p-3 cursor-pointer bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                {updateButton ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </main>
      ) : (
        ""
      )}

      <div className="v-main">
        {currentVehicles?.length > 0 ? (
          currentVehicles.map(
            (x) =>
              x.userId === user.rest._id && (
                <>
                  <div className="v-inner" key={x._id}>
                    <div className="v-first">
                      <img
                        src={`http://localhost:8081/uploads/${x.image}`}
                        alt={x.brand}
                      />
                      <div className="text-center my-6">
                        <a
                          onClick={() => {
                            setVehicleId(x._id);
                            setshowButton(true);
                            setUpdateButton(true);
                          }}
                          className=" bg-slate-800 cursor-pointer text-white border-2 border-white mr-2  hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
                        >
                          UPDATE
                        </a>
                        <a
                          onClick={() => {
                            setSelectedVehicleId(x._id);
                            setShowRemoveModal(true);
                          }}
                          className="bg-red-500 cursor-pointer text-white border-2 border-white hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
                        >
                          REMOVE
                        </a>
                      </div>
                    </div>
                    <div className="v-second">
                      <h3 className="text-xl font-bold text-center">
                        {x.model}
                      </h3>
                      <br />

                      <p>
                        <b>Brand: </b>
                        {x.brand}
                      </p>

                      <p>
                        <b>Type: </b> {x.type}
                      </p>

                      <p>
                        <b>Power: </b> {x.power}
                      </p>

                      <p>
                        <b>Fuel: </b> {x.Fuel}
                      </p>
                      <p>
                        <b>Price/Per day: </b> {x.price}
                      </p>
                      <p>
                        <b>Description: </b> {x.description}
                      </p>
                    </div>
                  </div>
                </>
              )
          )
        ) : (
          <h1 className="text-4xl font-semibold text-center">
            No vehicles available
          </h1>
        )}
      </div>

      <div className="pagination flex justify-center items-center gap-2 my-5">
        <button
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-10 h-10 flex items-center justify-center rounded-full border transition ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          <HiChevronLeft size={20} />
        </button>

        {Array.from(
          { length: Math.ceil(vehicle.length / vehiclesPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-full border transition ${
                currentPage === i + 1
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          )
        )}

        <button
          onClick={() =>
            currentPage < Math.ceil(vehicle.length / vehiclesPerPage) &&
            paginate(currentPage + 1)
          }
          disabled={currentPage === Math.ceil(vehicle.length / vehiclesPerPage)}
          className={`w-10 h-10 flex items-center justify-center rounded-full border transition ${
            currentPage === Math.ceil(vehicle.length / vehiclesPerPage)
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          <HiChevronRight size={20} />
        </button>
      </div>

      {showRemoveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-3">Confirm Removal</h2>
            <p>Are you sure you want to remove this vehicle?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowRemoveModal(false)}
                className="mr-3 px-4 py-2 bg-gray-300 text-black rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleRemove}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVehicle;
