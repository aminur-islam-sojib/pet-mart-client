import React from "react";
import PetHeroSection from "../components/Header";
import useAuth from "../Hooks/useAuth";

const Home = () => {
  const { token } = useAuth();
  console.log(token);
  return (
    <div>
      <PetHeroSection />
    </div>
  );
};

export default Home;
