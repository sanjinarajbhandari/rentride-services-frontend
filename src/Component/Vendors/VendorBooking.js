// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import VendorNav from "./VendorNav";
// import { useSelector } from "react-redux";

// export default function VendorBooking() {
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [filteredVehicles, setFilteredVehicles] = useState([]);
//   const [searchModel, setSearchModel] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [checkoutDate, setCheckoutDate] = useState("");
//   const [vehicles, setVehicles] = useState([]);

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     }
//   }, [user]);

//   async function fetchVehicle() {
//     try {
//       const response = await fetch("http://localhost:8081/getVehicle");
//       const responseData = await response.json();
//       const vehicles = responseData.vehicle;
//       // const filteredVehicles = vehicles.filter(
//       //   (vehicle) => vehicle.availability === true
//       // );
//       setVehicles(vehicles);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async function fetchBookings() {
//     try {
//       const response = await fetch("http://localhost:8081/fetchBookingadmin", {
//         credentials: "include",
//       });
//       const responseData = await response.json();
//       const allBookings = responseData.Bookings;

//       // Filter bookings to include only those where the vehicle belongs to this vendor
//       const vendorVehicleIds = vehicles
//         .filter((v) => v.vendorId === user.rest._id) // or v.owner === user.rest._id
//         .map((v) => v._id);

//       const filtered = allBookings.filter((booking) =>
//         vendorVehicleIds.includes(booking.vehicleId)
//       );

//       setBookings(filtered); // Use this for filtering
//       setFilteredVehicles(filtered); // Initially show all
//     } catch (error) {
//       toast.error("You are not admin", { position: "top-right" });
//       navigate("/");
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     fetchVehicle();
//     fetchBookings();
//   }, []);

//   // Filtering logic
//   useEffect(() => {
//     let filtered = bookings;

//     if (searchModel) {
//       filtered = filtered.filter((v) =>
//         v.model.toLowerCase().includes(searchModel.toLowerCase())
//       );
//     }
//     if (minPrice) {
//       filtered = filtered.filter((v) => v.price >= Number(minPrice));
//     }
//     if (maxPrice) {
//       filtered = filtered.filter((v) => v.price <= Number(maxPrice));
//     }
//     if (checkoutDate) {
//       filtered = filtered.filter(
//         (v) =>
//           new Date(v.checkOutDate).toLocaleDateString() ===
//           new Date(checkoutDate).toLocaleDateString()
//       );
//     }

//     setFilteredVehicles(filtered);
//   }, [searchModel, minPrice, maxPrice, checkoutDate, bookings]);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <VendorNav />
//       <div className="px-6 py-10">
//         <h1 className="text-3xl font-bold text-gray-800 mt-[90px] mb-6 text-center">
//           Vehicle Booking List
//         </h1>

//         {/* Filter Options */}
//         <div className="bg-white w-fit mx-auto shadow-md p-6 rounded-lg mb-6 flex flex-wrap gap-4 items-center justify-center">
//           <input
//             type="text"
//             placeholder="Search by Model..."
//             value={searchModel}
//             onChange={(e) => setSearchModel(e.target.value)}
//             className="border px-4 py-2 rounded-md w-48 md:w-56 focus:ring focus:ring-blue-300"
//           />

//           <input
//             type="number"
//             placeholder="Min Price"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             className="border px-4 py-2 rounded-md w-32 md:w-40 focus:ring focus:ring-blue-300"
//           />

//           <input
//             type="number"
//             placeholder="Max Price"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             className="border px-4 py-2 rounded-md w-32 md:w-40 focus:ring focus:ring-blue-300"
//           />

//           <input
//             type="date"
//             value={checkoutDate}
//             onChange={(e) => setCheckoutDate(e.target.value)}
//             className="border px-4 py-2 rounded-md w-48 md:w-56 focus:ring focus:ring-blue-300"
//           />

//           <button
//             onClick={() => {
//               setSearchModel("");
//               setMinPrice("");
//               setMaxPrice("");
//               setCheckoutDate("");
//             }}
//             className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition focus:ring focus:ring-red-300"
//           >
//             Clear Filters
//           </button>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//           <table className="w-full border-collapse">
//             {/* Table Header */}
//             <thead className="bg-blue-500 text-white text-left text-sm md:text-base font-semibold sticky top-0 z-10">
//               <tr>
//                 <th className="p-4">Checkout Date</th>
//                 <th className="p-4">Contact</th>
//                 <th className="p-4">Description</th>
//                 <th className="p-4">Email</th>
//                 <th className="p-4">Model</th>
//                 <th className="p-4">Price/Day</th>
//                 <th className="p-4">User</th>
//                 <th className="p-4">Vehicle ID</th>
//               </tr>
//             </thead>

//             {/* Table Body */}
//             <tbody>
//               {filteredVehicles.length > 0 ? (
//                 filteredVehicles.map((vehicle, index) => (
//                   <tr
//                     key={index}
//                     className={`border-b text-gray-700 text-sm md:text-base ${
//                       index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                     } hover:bg-gray-200 transition-all`}
//                   >
//                     <td className="p-4">
//                       {new Date(vehicle.checkOutDate).toLocaleDateString()}
//                     </td>
//                     <td className="p-4">{vehicle.contact}</td>
//                     <td className="p-4">{vehicle.description}</td>
//                     <td className="p-4">{vehicle.email}</td>
//                     <td className="p-4">{vehicle.model}</td>
//                     <td className="p-4 font-bold text-green-600">
//                       Rs. {vehicle.price}
//                     </td>
//                     <td className="p-4">{vehicle.userName}</td>
//                     <td className="p-4">{vehicle.vehicleId}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="8"
//                     className="text-center p-6 text-gray-500 italic"
//                   >
//                     No bookings found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import VendorNav from "./VendorNav";
import { useSelector } from "react-redux";

export default function VendorBooking() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchModel, setSearchModel] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    // Debug user object
    console.log("Current user object:", user);
    console.log("Vendor ID (user.rest._id):", user?.rest?._id);
    
    fetchData();
  }, [user, navigate]);

  async function fetchData() {
    try {
      setLoading(true);
      const vehiclesData = await fetchVehicle();
      if (vehiclesData && vehiclesData.length > 0) {
        await fetchBookings(vehiclesData);
      } else {
        console.log("No vehicles found for this vendor");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data");
      setLoading(false);
    }
  }

  async function fetchVehicle() {
    try {
      const response = await fetch("http://localhost:8081/getVehicle");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      const allVehicles = responseData.vehicle || [];
      
      console.log("All vehicles:", allVehicles);
      
      // Check if the vendorId field exists and what it's called
      if (allVehicles.length > 0) {
        console.log("Sample vehicle fields:", Object.keys(allVehicles[0]));
        console.log("Sample vehicle:", allVehicles[0]);
      }
      
      // Try different possible vendor ID field names
      let vendorIdField = null;
      const possibleFields = ['vendorId', 'vendor', 'owner', 'ownerId', 'userId'];
      
      for (const field of possibleFields) {
        if (allVehicles.length > 0 && field in allVehicles[0]) {
          vendorIdField = field;
          console.log(`Found vendor ID field: ${field}`);
          break;
        }
      }
      
      if (!vendorIdField) {
        console.error("Could not find vendor ID field in vehicle data");
        setVehicles([]);
        return [];
      }
      
      // Filter to get only this vendor's vehicles
      const vendorVehicles = allVehicles.filter(vehicle => {
        return vehicle[vendorIdField] === user?.rest?._id;
      });
      
      console.log(`Vehicles for vendor ${user?.rest?._id}:`, vendorVehicles);
      
      setVehicles(vendorVehicles);
      return vendorVehicles;
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast.error("Could not load vehicles");
      return [];
    }
  }

  async function fetchBookings(vendorVehicles) {
    try {
      const response = await fetch("http://localhost:8081/fetchBookingadmin", {
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      const allBookings = responseData.Bookings || [];
      
      console.log("All bookings:", allBookings);
      
      // Get IDs of this vendor's vehicles
      const vendorVehicleIds = vendorVehicles.map(v => v._id);
      console.log("Vendor vehicle IDs:", vendorVehicleIds);
      
      // If no vendor vehicle IDs, there won't be any bookings to show
      if (vendorVehicleIds.length === 0) {
        console.log("No vehicles found for this vendor - cannot filter bookings");
        setBookings([]);
        setFilteredBookings([]);
        setLoading(false);
        return;
      }
      
      // Filter bookings to only include this vendor's vehicles
      const vendorBookings = allBookings.filter(booking => {
        return vendorVehicleIds.includes(booking.vehicleId);
      });
      
      console.log("Vendor bookings after filter:", vendorBookings);
      
      // Join booking data with vehicle details
      const enhancedBookings = vendorBookings.map(booking => {
        const vehicle = vendorVehicles.find(v => v._id === booking.vehicleId);
        
        return {
          ...booking,
          model: booking.model || vehicle?.model || "Unknown Model",
          price: booking.price || vehicle?.price || 0,
        };
      });
      
      console.log("Enhanced bookings with vehicle data:", enhancedBookings);
      
      setBookings(enhancedBookings);
      setFilteredBookings(enhancedBookings);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load booking data");
      setLoading(false);
    }
  }

  // Filtering logic
  useEffect(() => {
    let filtered = bookings;

    if (searchModel) {
      filtered = filtered.filter((booking) =>
        booking.model?.toLowerCase().includes(searchModel.toLowerCase())
      );
    }
    
    if (minPrice) {
      filtered = filtered.filter((booking) => booking.price >= Number(minPrice));
    }
    
    if (maxPrice) {
      filtered = filtered.filter((booking) => booking.price <= Number(maxPrice));
    }
    
    if (checkoutDate) {
      filtered = filtered.filter(
        (booking) =>
          new Date(booking.checkOutDate).toLocaleDateString() ===
          new Date(checkoutDate).toLocaleDateString()
      );
    }

    setFilteredBookings(filtered);
  }, [searchModel, minPrice, maxPrice, checkoutDate, bookings]);

  // Check if no vehicles are available
  const noVehiclesFound = !loading && vehicles.length === 0;
  
  return (
    <div className="min-h-screen bg-gray-100">
      <VendorNav />
      <div className="px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mt-[90px] mb-6 text-center">
          Vehicle Booking List
        </h1>

        {/* Filter Options */}
        <div className="bg-white w-fit mx-auto shadow-md p-6 rounded-lg mb-6 flex flex-wrap gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Search by Model..."
            value={searchModel}
            onChange={(e) => setSearchModel(e.target.value)}
            className="border px-4 py-2 rounded-md w-48 md:w-56 focus:ring focus:ring-blue-300"
          />

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border px-4 py-2 rounded-md w-32 md:w-40 focus:ring focus:ring-blue-300"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border px-4 py-2 rounded-md w-32 md:w-40 focus:ring focus:ring-blue-300"
          />

          <input
            type="date"
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
            className="border px-4 py-2 rounded-md w-48 md:w-56 focus:ring focus:ring-blue-300"
          />

          <button
            onClick={() => {
              setSearchModel("");
              setMinPrice("");
              setMaxPrice("");
              setCheckoutDate("");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition focus:ring focus:ring-red-300"
          >
            Clear Filters
          </button>
        </div>

        {/* Loading indicator */}
        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">Loading bookings...</p>
          </div>
        ) : noVehiclesFound ? (
          <div className="text-center py-10 bg-white shadow-md rounded-lg">
            <p className="text-gray-600 text-lg p-6">
              No vehicles found for your vendor account. Please add vehicles first.
            </p>
          </div>
        ) : (
          // Table
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead className="bg-blue-500 text-white text-left text-sm md:text-base font-semibold sticky top-0 z-10">
                <tr>
                  <th className="p-4">Checkout Date</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Model</th>
                  <th className="p-4">Price/Day</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Vehicle ID</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking, index) => (
                    <tr
                      key={index}
                      className={`border-b text-gray-700 text-sm md:text-base ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-200 transition-all`}
                    >
                      <td className="p-4">
                        {new Date(booking.checkOutDate).toLocaleDateString()}
                      </td>
                      <td className="p-4">{booking.contact}</td>
                      <td className="p-4">{booking.description}</td>
                      <td className="p-4">{booking.email}</td>
                      <td className="p-4">{booking.model}</td>
                      <td className="p-4 font-bold text-green-600">
                        Rs. {booking.price}
                      </td>
                      <td className="p-4">{booking.userName}</td>
                      <td className="p-4">{booking.vehicleId}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center p-6 text-gray-500 italic"
                    >
                      No bookings found for your vehicles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}