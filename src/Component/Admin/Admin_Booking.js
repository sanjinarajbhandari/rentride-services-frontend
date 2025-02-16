import React from "react";
import AdminNav from "./AdminNav";

const staticBookings = [
  {
    checkOutDate: "2025-03-15",
    contact: "1234567890",
    description: "Luxury SUV for a road trip.",
    email: "user1@example.com",
    model: "Model X",
    price: "$5000",
    userName: "JohnDoe",
    vehicleId: "V001",
  },
  {
    checkOutDate: "2025-04-10",
    contact: "9876543210",
    description: "Compact sedan for city travel.",
    email: "user2@example.com",
    model: "Model Y",
    price: "$4000",
    userName: "JaneDoe",
    vehicleId: "V002",
  },
];

export default function Admin_Booking() {
  return (
    <>
      <AdminNav />
      <div className="V-heading font-bold text-xxl ">Vehicle Booking list</div>
      <table className="w-full my-12 p-6">
        <thead>
          <tr className="shadow-lg border-black border-4 rounded-xxl  ">
            <th>checkOutDate</th>
            <th>Contact</th>
            <th>Description</th>
            <th>email</th>
            <th>model</th>
            <th>Price/Per day</th>
            <th>userName</th>
            <th>vehicleId</th>
          </tr>
        </thead>
        <tbody>
          {staticBookings.map((vehicle, index) => (
            <tr
              className="shadow-lg text-center border-black border-1 rounded-xxl"
              key={index}
            >
              <td>{vehicle.checkOutDate}</td>
              <td>{vehicle.contact}</td>
              <td>{vehicle.description}</td>
              <td>{vehicle.email}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.price}</td>
              <td>{vehicle.userName}</td>
              <td>{vehicle.vehicleId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
