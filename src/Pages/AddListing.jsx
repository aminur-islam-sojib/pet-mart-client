import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";
import logo from "../assets/logo.png";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useDynamicTitle from "../Hooks/useDynamicTitle";

const AddListing = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const instanceSecure = useAxiosSecure();

  useDynamicTitle("Add Listing");

  // Slug generation utility function
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Check if user is authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-rose-50 flex items-center justify-center px-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <figure>
              <img src={logo} alt="" />
            </figure>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600">Please login to add a listing</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    // Validate the form data
    if (!form.name.value || !form.category.value || !form.location.value) {
      toast.error("Please fill in all required fields!");
      setLoading(false);
      return;
    }

    if (form.price.value < 0) {
      toast.error("Price cannot be negative!");
      setLoading(false);
      return;
    }

    // Generate slug from category
    const categorySlug = generateSlug(form.category.value);

    const newListing = {
      name: form.name.value.trim(),
      category: form.category.value,
      categorySlug: categorySlug,
      price: parseFloat(form.price.value) || 0,
      location: form.location.value.trim(),
      description: form.description.value.trim(),
      image: form.image.value.trim(),
      date: new Date(form.date.value).toISOString(),
      email: user?.email,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await instanceSecure.post("/listings", newListing);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Product Added Successfully!",
          icon: "success",
          draggable: true,
        });
        form.reset();
      } else {
        toast.error("Server responded but no ID was returned");
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        toast.error("You are not authorized. Please login again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid data submitted");
      } else if (error.code === "ERR_NETWORK") {
        toast.error(
          "Cannot connect to server. Please check if the server is running."
        );
      } else {
        toast.error(
          "Failed to add listing: " + (error.message || "Unknown error")
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen   py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <figure className=" h-16 w-auto flex justify-center">
            <img src={logo} alt="" className=" h-full w-auto" />
          </figure>

          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Add New<span className="text-rose-600"> Listings</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Share your pet, products, or services with our community
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Grid Layout for Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pet/Product Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pet/Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g., Golden Retriever Puppy"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition outline-none bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Pets">🐕 Pets</option>
                    <option value="Pet Food">🍖 Pet Food</option>
                    <option value="Accessories">🎾 Accessories</option>
                    <option value="Care Products">💊 Care Products</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (USD) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition outline-none"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter 0 for adoption/free items
                  </p>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g., New York, NY"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition outline-none"
                  />
                </div>

                {/* Date Available */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Available Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition outline-none"
                  />
                </div>

                {/* Image URL */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition outline-none"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    placeholder="Provide detailed information about your listing..."
                    required
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition outline-none resize-none"
                  ></textarea>
                </div>

                {/* Email (Read-only) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linear-to-r from-rose-500 to-rose-600 text-white font-semibold py-4 rounded-xl hover:from-rose-600 hover:to-rose-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding Listing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add Listing
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Need help?</span> Make sure all
            required fields (*) are filled correctly
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddListing;
