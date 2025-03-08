import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  payementFailure,
  paymentStart,
  paymentSuccess,
} from "../../redux/user/paymentSlice";

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(window.location.search);
  const purpose = searchParams.get("purchase_order_name");
  useEffect(() => {
    const submitAlbum = async () => {
      try {
        dispatch(paymentStart());
        const pidx = searchParams.get("pidx");
        const requestData = { pidx: pidx }; // Create object with pidx
        const response = await fetch("http://localhost:8081/khaltiSuccess", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData), // Stringify the object
        });

        const responseData = await response.json(); // Parse response JSON

        if (responseData.status === "Completed") {
          dispatch(paymentSuccess());
          alert("Thank You! Payment has been received.");
          if (purpose === "vehicle") {
            console.log("aana");
            navigate("/Booking");
          } else if (purpose === "product") {
            console.log("prodododooddo");
            navigate("/cart");
          } else {
            console.log("buwa");
          }
        } else {
          dispatch(payementFailure());
        }
      } catch (error) {
        dispatch(payementFailure());
        console.error(error);
      }
    };

    submitAlbum(); // Call the function once
  }, []);

  return null; // This component doesn't render anything
};

export default Success;