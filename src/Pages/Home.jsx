import React from "react";
import PetHeroSection from "../components/Header";
import RecentProducts from "../components/RecentProducts";
import CategoriesSection from "../components/CategoriesSection";

const Home = () => {
  return (
    <div>
      <PetHeroSection />
      <CategoriesSection />
      <RecentProducts />
    </div>
  );
};

export default Home;
