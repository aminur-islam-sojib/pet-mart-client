import { useEffect } from "react";
import useAxios from "../Hooks/useAxios";
import { useState } from "react";
import ListingCard from "../components/Card";
import { Search } from "lucide-react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router";

const categories = ["All", "Pets", "Pet Food", "Accessories", "Care Products"];

const PetsAndSupply = () => {
  const instance = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await instance.get(`/search?search=${searchQuery}`);
        console.log(res.data);
        setListings(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, instance]);

  if (loading) console.log("loading..");

  console.log(selectedCategory);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await instance.get(
          `/category-filtered-product/${selectedCategory}`
        );
        console.log(res.data);
        setListings(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [instance, selectedCategory]);

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-rose-50 p-8">
        <div className="w-11/12 mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Featured Listings
            </h1>
            <p className="text-gray-600">
              Find your perfect companion or pet supplies
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
            {/* Search Bar */}
            <div className="relative w-full sm:w-96">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search listings..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-rose-200 rounded-full focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition outline-none bg-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-48 px-5 py-3 border-2 border-rose-200 rounded-full focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition outline-none bg-white font-medium text-gray-700 cursor-pointer"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Cards Grid */}
          {loading && loading ? (
            <Loading />
          ) : (
            <div>
              {listings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076502.png"
                    alt="No Products"
                    className="w-32 mb-4 opacity-70"
                  />
                  <p className="text-lg font-medium">No Products Available</p>
                  <button
                    onClick={() => navigate(0)}
                    className="mt-4 px-5 py-2 cursor-pointer rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
                  >
                    Browse Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PetsAndSupply;
