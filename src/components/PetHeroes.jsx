import { Heart, MapPin, Star } from "lucide-react";
import { useState } from "react";

const PetHeroes = () => {
  const [activeHero, setActiveHero] = useState(null);

  const heroes = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Foster Parent",
      location: "Seattle, WA",
      petsHelped: 47,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      story:
        "Sarah has been fostering dogs for 5 years, providing temporary homes and unconditional love to pets waiting for their forever families.",
      achievement: "🏆 Foster Hero of the Year 2024",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Adoption Counselor",
      location: "Portland, OR",
      petsHelped: 156,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      story:
        "Michael's expertise in matching families with the right pets has resulted in successful adoptions and countless happy homes.",
      achievement: "🎯 Perfect Match Specialist",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Rescue Volunteer",
      location: "Austin, TX",
      petsHelped: 89,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      story:
        "Emily dedicates her weekends to rescuing abandoned pets and providing them with medical care and rehabilitation.",
      achievement: "💝 Compassion Award Winner",
    },
    {
      id: 4,
      name: "James Taylor",
      role: "Senior Caregiver",
      location: "Denver, CO",
      petsHelped: 203,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      story:
        "With over 10 years of experience, James specializes in caring for senior pets and those with special needs.",
      achievement: "⭐ Lifetime Achievement Award",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Community Educator",
      location: "Boston, MA",
      petsHelped: 124,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      story:
        "Lisa runs workshops teaching responsible pet ownership and has helped hundreds of families prepare for adoption.",
      achievement: "📚 Education Champion 2024",
    },
    {
      id: 6,
      name: "David Kim",
      role: "Transport Coordinator",
      location: "Chicago, IL",
      petsHelped: 178,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      story:
        "David organizes cross-country pet transports, ensuring animals reach their new homes safely and comfortably.",
      achievement: "🚗 Journey Hero Award",
    },
  ];

  return (
    <section className="py-20 px-4  dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold">
              Our Amazing Team
            </span>
          </div>
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Meet Our Pet <span className="text-rose-600">Heroes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated individuals who make a difference, one pet at a time.
              Their compassion and commitment have transformed countless lives.
            </p>
          </div>
        </div>

        {/* Heroes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {heroes.map((hero) => (
            <div
              key={hero.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              onMouseEnter={() => setActiveHero(hero.id)}
              onMouseLeave={() => setActiveHero(null)}
            >
              {/* Hero Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

                {/* Stats Badge */}
                <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-900/95 rounded-full px-4 py-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500 " />
                  <span className="font-bold text-gray-900 dark:text-black">
                    {hero.petsHelped}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    pets
                  </span>
                </div>

                {/* Role Badge */}
                <div className="absolute top-4 left-4 bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {hero.role}
                </div>
              </div>

              {/* Hero Info */}
              <div className="p-6">
                {/* Name and Rating */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {hero.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{hero.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {hero.rating}
                    </span>
                  </div>
                </div>

                {/* Story */}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {hero.story}
                </p>

                {/* Achievement */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                    {hero.achievement}
                  </p>
                </div>

                {/* Hover Effect - Contact Button */}
                <div
                  className={`mt-4 transition-all duration-300 ${
                    activeHero === hero.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                >
                  <button className="bg-linear-to-r from-rose-500 to-rose-600 text-white font-semibold px-8 py-2 w-full rounded   hover:from-rose-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetHeroes;
