import { Heart, Home, Shield, Users } from "lucide-react";
import { Link } from "react-router";

const AdoptionAwareness = () => {
  const reasons = [
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Save a Life",
      description:
        "Every adoption saves a life and opens up space for another animal in need. Give a deserving pet a second chance at happiness.",
    },
    {
      icon: <Home className="w-12 h-12" />,
      title: "Find Your Perfect Match",
      description:
        "Our pets are evaluated for temperament and behavior, helping you find the perfect companion that fits your lifestyle and family.",
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Health Guaranteed",
      description:
        "All our pets are vaccinated, spayed/neutered, and receive comprehensive health checks before adoption.",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Lifetime Support",
      description:
        "Get ongoing support from our team of experts. We're here to help you and your new family member thrive together.",
    },
  ];

  return (
    <section className=" w-11/12 mx-auto py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Why Adopt from <span className="text-rose-600">PawMart?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Adopting a pet is one of the most rewarding decisions you'll ever
            make. Here's why PawMart is the perfect place to find your new best
            friend.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-linear-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="mb-6 text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                {reason.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Link
            to={"/category-filtered-product/pets"}
            className="bg-linear-to-r from-rose-500 to-rose-600 text-white font-semibold px-8 py-4 rounded-full hover:from-rose-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Your Adoption Journey
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdoptionAwareness;
