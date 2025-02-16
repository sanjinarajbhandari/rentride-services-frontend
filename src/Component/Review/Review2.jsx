import React, { useState } from "react";
import { useForm } from "react-hook-form";
const Review2 = ({ productId, onClose, vehicleId }) => {
  const [showPopup, setShowPopup] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  function handleClose() {
    setShowPopup(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-l relative">
        <button
          className="absolute top-0 right-0 px-4 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={handleClose}
        >
          <i className="fas fa-times" />
        </button>
        <form
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex flex-col gap-4 flex-1">
            <textarea
              className="border p-3 rounded-lg "
              rows="4"
              cols="50"
              {...register("review", { required: true })}
              placeholder="Enter your experience"
              name="review"
            />
            {errors.review && <p>Review is required</p>}

            <input
              className=" p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review2;
