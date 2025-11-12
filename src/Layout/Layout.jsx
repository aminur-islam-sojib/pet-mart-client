/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <motion.div
        key={window.location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Layout;
