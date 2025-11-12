import { useNavigate } from "react-router";

const CategoryCard = ({
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
  title,
  slug,
  description,
  gradient,
  iconBg,
  productCount,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // You'll add navigation logic here
    console.log(`/category-filtered-product/${slug}`);
    // Example: navigate(`/products?category=${slug}`);
    navigate(`/category-filtered-product/${slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative overflow-hidden rounded-3xl bg-white p-8 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl shadow-lg border border-rose-100"
    >
      {/* Gradient Background - Animated on Hover */}
      <div
        className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      ></div>

      {/* Floating Circles Decoration */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-rose-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-rose-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon Container */}
        <div
          className={`w-20 h-20 ${iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
        >
          <Icon className="w-10 h-10 text-white" strokeWidth={2} />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed  grow">
          {description}
        </p>

        {/* Product Count & Arrow */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-semibold text-rose-500 bg-rose-50 px-4 py-2 rounded-full">
            {productCount}+ Products
          </span>

          {/* Arrow Icon */}
          <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center group-hover:bg-rose-600 transition-all duration-300 group-hover:translate-x-1">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white to-transparent opacity-20"></div>
    </div>
  );
};
export default CategoryCard;
