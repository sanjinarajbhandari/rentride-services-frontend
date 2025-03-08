import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import Khalti from "../Khalti/Khalti";
import { paymentReset } from "../../redux/user/paymentSlice";
import { useNavigate } from "react-router-dom";
import {
  reservationStart,
  reservationReset,
  reservationSuccess,
} from "../../redux/user/reservationSlice";

export default function Booking({ price, model, onClose, id }) {
  const { user, loading, error } = useSelector((state) => state.user);
  console.log(user, "vlaue");
  const { reservationStatus } = useSelector((state) => state.reservation);
  const { paymentStatus } = useSelector((state) => state.payment);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [contact, setContact] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const [khalti, setKhalti] = useState(false);
  const storage = getStorage(app);

  const handleKhalti = (e) => {
    e.preventDefault();
    console.log("hoooooooooooooooo");
    const storageRef = ref(storage, `reservationImage/${file.name}`);
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
        console.log(downloadURL);
        const userData = {
          email: user?.rest.email,
          userName,
          contact,
          checkOutDate,
          price,
          description,
          model,
          image: downloadURL,
          vehicleId: id,
        };
        console.log(userData);
        dispatch(reservationStart());
        dispatch(reservationSuccess(userData));
        console.log(reservationStatus, "rese");
      }
    );
    console.log("dhelllooohh");

    setKhalti(true);
  };

  useEffect(() => {
    if (paymentStatus === "success") {
      handleConfirmBooking();
    }
  }, [paymentStatus]);

  const handleConfirmBooking = async () => {
    try {
      const response = await fetch("http://localhost:8081/createBooking", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationStatus),
      });
      dispatch(reservationReset());
      dispatch(paymentReset());
      setTimeout(function () {
        navigate("/Vehicle");
      }, 3000);

      // Reset all states after successful form submission
      setUserName("");
      setContact("");
      setCheckOutDate("");
      setDescription("");
      setFile("");
      setShowPopup(false);

      onClose();
    } catch (error) {
      console.error("Error adding vechicle Booking", error);
    }
  };

  function handleClose() {
    setShowPopup(false);
    onClose();
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
                  // min={new Date().toISOString().split("T")[0]}
                  maxLength="3"
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

      {khalti && <Khalti amounto={price} purpose={"vehicle"} />}
    </>
  );
}
