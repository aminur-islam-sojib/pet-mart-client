import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import ListingCard from "./Card";

const RecentProducts = () => {
  const instance = useAxios();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/recent-products");
        setListings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [instance]);

  return (
    <section>
      <div className="text-center my-16">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Recent <span className="text-rose-600">Products</span>
        </h2>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-11/12 mx-auto mb-10">
        {listings.map((listing) => (
          <div key={listing._id}>
            {" "}
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentProducts;
