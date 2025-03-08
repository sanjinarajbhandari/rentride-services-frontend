import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";

import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./Admin_Vehicle.css";

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
  const [vehicle, setVehicle] = useState();
  const [updateButton, setUpdateButton] = useState(false);
  const [showButton, setshowButton] = useState(false);
  const [vehicleId, setVehicleId] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let data = [];

      const storage = getStorage(app);
      const storageRef = ref(storage, `vehicleImage/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log("Error uploading image :", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const userData = {
            brand: brand,
            model: model,
            power: power,
            Fuel: fuel,
            price: price,
            type: type,
            description: description,
            image: downloadURL,
          };

          console.log("File available at:", userData);
          if (vehicleId) {
            const response = await fetch(
              `http://localhost:8081/admin/vehicle/${vehicleId}`,
              {
                method: "PUT",
                credentials: "include",

                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
              }
            );
            data = await response.json();
          } else {
            const response = await fetch(
              "http://localhost:8081/createVehicle",
              {
                method: "POST",
                credentials: "include",

                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
              }
            );

            data = await response.json();
            toast.success("Vehicle has been added", {
              position: "top-right",
            });
            window.location.reload();
          }
          console.log(data, "datas");
          // Reset all states after successful form submission
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
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchVehicle() {
    try {
      const response = await fetch("http://localhost:8081/admin/getVehicle", {
        credentials: "include",
      });
      const responseData = await response.json();
      setVehicle(responseData.vehicle);
    } catch (error) {
      toast.error("You are not admin", {
        position: "top-right",
      });
      navigate("/");

      console.error(error);
    }
  }

  useEffect(() => {
    fetchVehicle();
  }, []);

  //Delete a product
  async function remove(id) {
    try {
      const response = await fetch(`http://localhost:8081/Vehicle/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      // Remove the deleted product from the productList state
      setVehicle((prevVehicleList) =>
        prevVehicleList.filter((vehicle) => vehicle._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
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
        <main className="border border-black  rounded-lg p-3 max-w-4xl mx-auto my-10">
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
                  <span className="text-xs font-semibold">($ / Day)</span>
                </div>
              </div>
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
        {vehicle?.length > 0 ? (
          vehicle.map((x) => (
            <div className="v-inner">
              <div className="v-first">
                <img src={x.image} alt={x.brand} />
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
                    onClick={() => remove(x._id)}
                    className="bg-red-500 cursor-pointer ml-2 text-white border-2 border-white hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl "
                  >
                    DELETE
                  </a>
                </div>
              </div>
              <div className="v-second">
                <h3 className="text-xl font-bold text-center">{x.model}</h3>
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
          ))
        ) : (
          <p className="w-full font-bold text-black text-center col-span-2">
            No Vehicles Available
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminVehicle;
