import React from "react";
import PetHeroSection from "../components/Header";
import RecentProducts from "../components/RecentProducts";
import CategoriesSection from "../components/CategoriesSection";
import useDynamicTitle from "../Hooks/useDynamicTitle";
import AdoptionAwareness from "../components/AdoptionAwareness";
import PetHeroes from "../components/PetHeroes";

const Home = () => {
  useDynamicTitle("Home");
  return (
    <div>
      <PetHeroSection />
      <CategoriesSection />
      <RecentProducts />
      <AdoptionAwareness />
      <PetHeroes />
    </div>
  );
};

export default Home;
