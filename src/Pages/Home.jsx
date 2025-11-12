import React from "react";
import PetHeroSection from "../components/Header";
import RecentProducts from "../components/RecentProducts";
import CategoriesSection from "../components/CategoriesSection";
import useDynamicTitle from "../Hooks/useDynamicTitle";

const Home = () => {
  useDynamicTitle("Home");
  return (
    <div>
      <PetHeroSection />
      <CategoriesSection />
      <RecentProducts />
    </div>
  );
};

export default Home;
