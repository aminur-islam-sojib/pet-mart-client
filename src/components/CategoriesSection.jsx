import { Heart, ShoppingBag, Sparkles, Stethoscope } from "lucide-react";
import CategoryCard from "./CategoriesCard";
import useFetchData from "../Hooks/useFetchData";

const CategoriesSection = () => {
  const pets = useFetchData("pets");
  const petFood = useFetchData("pet-food");
  const accessories = useFetchData("accessories");
  const careProducts = useFetchData("care-products");

  const categories = [
    {
      icon: Heart,
      title: "Pets",
      slug: "pets",
      description:
        "Find your perfect furry companion from our curated selection",
      gradient: "bg-gradient-to-br from-rose-400 to-pink-500",
      iconBg: "bg-gradient-to-br from-rose-500 to-pink-600",
      productCount: pets.length,
    },
    {
      icon: ShoppingBag,
      title: "Pet Food",
      slug: "pet-food",
      description: "Premium nutrition for healthy and happy pets",
      gradient: "bg-gradient-to-br from-orange-400 to-rose-500",
      iconBg: "bg-gradient-to-br from-orange-500 to-rose-600",
      productCount: petFood.length,
    },
    {
      icon: Sparkles,
      title: "Accessories",
      slug: "accessories",
      description: "Stylish and functional accessories for your beloved pets",
      gradient: "bg-gradient-to-br from-purple-400 to-rose-500",
      iconBg: "bg-gradient-to-br from-purple-500 to-rose-600",
      productCount: accessories.length,
    },
    {
      icon: Stethoscope,
      title: "Care Products",
      slug: "care-products",
      description: "Essential care products to keep your pets healthy",
      gradient: "bg-gradient-to-br from-blue-400 to-rose-500",
      iconBg: "bg-gradient-to-br from-blue-500 to-rose-600",
      productCount: careProducts.length,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-rose-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Shop by <span className="text-rose-600">Category</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover everything your pet needs in one place
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for?
          </p>
          <button className="bg-linear-to-r from-rose-500 to-rose-600 text-white font-semibold px-8 py-4 rounded-full hover:from-rose-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
