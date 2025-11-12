import { useNavigate } from "react-router-dom";
import OptimizedImage from "./OptimizedImage";

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();
  const { _id, image, name, category, price, location } = listing;

  // Handle card click
  const handleCardClick = () => {
    navigate(`/listing/${_id}`);
  };

  // Handle button click (prevent propagation to card)
  const handleDetailsClick = (e) => {
    e.stopPropagation();
    navigate(`/listing/${_id}`);
  };

  // Format price
  const formatPrice = (price) => {
    if (price === 0) return "FREE";
    return `$${price.toLocaleString()}`;
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-rose-100 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-56 bg-gray-200">
        <OptimizedImage
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Category Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-rose-600 shadow-sm">
            {category}
          </span>
        </div>

        {/* Free Badge for adoption */}
        {price === 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              FREE
            </span>
          </div>
        )}

        {/* Location Badge (if available) */}
        {location && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {location}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(price)}
              </p>
            )}
          </div>

          {/* See Details Button */}
          <button
            onClick={handleDetailsClick}
            className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
