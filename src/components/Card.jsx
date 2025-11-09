import React from "react";

// Sample data for demonstration

const ListingCard = ({ listing }) => {
  const { image, name, category, price } = listing;

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-rose-100">
      {/* Image Container */}
      <div className="relative overflow-hidden h-56">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-rose-600 shadow-sm">
            {category}
          </span>
        </div>
        {/* Free Badge for adoption */}
        {price === 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              FREE
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-rose-600 transition-colors">
          {name}
        </h3>

        {/* Price and Button Row */}
        <div className="flex items-center justify-between">
          {/* Price */}
          <div>
            {price === 0 ? (
              <p className="text-xl font-bold text-rose-600">Adoption</p>
            ) : (
              <p className="text-2xl font-bold text-gray-900">${price}</p>
            )}
          </div>

          {/* See Details Button */}
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95">
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
