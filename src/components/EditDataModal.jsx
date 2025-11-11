import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const EditDataModal = ({ dialogRef, listing, fetchData }) => {
  const instanceSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    date: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (listing) {
      setFormData({
        name: listing.name || "",
        description: listing.description || "",
        price: listing.price || "",
        location: listing.location || "",
        date: listing?.date
          ? new Date(listing.date).toISOString().split("T")[0]
          : "",
        imageUrl: listing.image || "",
      });
    }
  }, [listing]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await instanceSecure.patch(`/updateItem/${listing._id}`, formData);
      fetchData();
      Swal.fire({
        title: "Updated!",
        text: "Your file has been Updated.",
        icon: "success",
      });

      dialogRef.current.close();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelModal = () => {
    dialogRef.current.close();
  };

  return (
    <div className="bg-white rounded-lg  ">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Pet Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Pet Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Pet Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
            placeholder="Enter pet name"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition resize-none"
            placeholder="Describe your pet"
          ></textarea>
        </div>

        {/* Price and Location - Side by side on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
              placeholder="Enter location"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
          />
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-center items-center gap-3">
          <button
            type="button"
            onClick={handleCancelModal}
            className=" btn flex-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full flex-1 bg-rose-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-rose-600 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDataModal;
