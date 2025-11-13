import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxios from "../Hooks/useAxios";
import ListingCard from "./Card";
import Loading from "./Loading";

const RecentProducts = () => {
  const instance = useAxios();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await instance.get("/recent-products");
        setListings(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [instance]);

  if (loading) return <Loading />;

  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center my-16"
      >
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Recent <span className="text-rose-600">Products</span>
        </h2>
      </motion.div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-11/12 mx-auto mb-10">
        {listings.map((listing, index) => (
          <motion.div
            key={listing._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <ListingCard listing={listing} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentProducts;
