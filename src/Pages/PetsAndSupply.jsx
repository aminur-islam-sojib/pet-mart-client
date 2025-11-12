import { useEffect } from "react";
import useAxios from "../Hooks/useAxios";
import { useState } from "react";
import ListingCard from "../components/Card";
import { Search } from "lucide-react";
import Loading from "../components/Loading";
import EmptyReload from "../components/EmptyReload";

const PetsAndSupply = () => {
  const instance = useAxios();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await instance.get(`/search?search=${searchQuery}`);
        setListings(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, instance]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await instance.get(
          `/category-filtered-product/${selectedCategory}`
        );

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
              onChange={(e) => setSelectedCategory(e.target.value)}
              name="category"
              required
              className=" rounded-full px-4 py-3 border-2 border-gray-200   focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition outline-none bg-white"
            >
              <option value="all">All</option>
              <option value="pets">Pets</option>
              <option value="pet-food">Pet Food</option>
              <option value="accessories">Accessories</option>
              <option value="care-products">Care Products</option>
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
                    <ListingCard key={listing._id} listing={listing} />
                  ))}
                </div>
              ) : (
                <EmptyReload />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PetsAndSupply;
