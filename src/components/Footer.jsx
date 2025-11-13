import logo from "../assets/logo.png";
import {
  Heart,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  X,
} from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { NavLink } from "react-router";

import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";

export default function Footer() {
  const instance = useAxios();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = (
    <div className=" flex flex-col gap-3">
      <NavLink
        to="/"
        className="text-rose-600 hover:text-rose-800 hover:translate-x-1 inline-block transition-all duration-200 text-sm"
      >
        Home
      </NavLink>
      <NavLink
        to="/pets-supplies"
        className="text-rose-600 hover:text-rose-800 hover:translate-x-1 inline-block transition-all duration-200 text-sm"
      >
        Pets & Supplies
      </NavLink>
      <NavLink
        to="/add-listing"
        className="text-rose-600 hover:text-rose-800 hover:translate-x-1 inline-block transition-all duration-200 text-sm"
      >
        Add Listing
      </NavLink>
      <NavLink
        to="/my-listings"
        className="text-rose-600 hover:text-rose-800 hover:translate-x-1 inline-block transition-all duration-200 text-sm"
      >
        My Listings
      </NavLink>
      <NavLink
        to="/my-orders"
        className="text-rose-600 hover:text-rose-800 hover:translate-x-1 inline-block transition-all duration-200 text-sm"
      >
        My Orders
      </NavLink>
    </div>
  );

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const subscribedEmail = e.target.email.value;
    console.log(subscribedEmail);

    if (subscribedEmail.trim() === "")
      return toast.info("Please Provide an valid Email", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

    try {
      const res = await instance.post("/subscription", { subscribedEmail });
      console.log(res.data);
      Swal.fire({
        title: "Thanks For Subscribe!",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className="bg-linear-to-br from-rose-50 via-rose-100 to-pink-50 text-rose-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-rose-300 to-transparent"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-rose-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div
              className="flex items-center space-x-2 group cursor-pointer"
              onClick={scrollToTop}
            >
              <div className=" w-12 h-12">
                <OptimizedImage src={logo} />
              </div>
              <h2 className="text-2xl font-bold bg-linear-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
                PawMart
              </h2>
            </div>
            <p className="text-rose-700 text-sm leading-relaxed">
              Your trusted companion for all pet needs. Bringing happiness to
              pets and their families since day one.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-white hover:bg-rose-500 text-rose-500 hover:text-white p-2.5 rounded-lg transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-white hover:bg-rose-500 text-rose-500 hover:text-white p-2.5 rounded-lg transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-white hover:bg-rose-500 text-rose-500 hover:text-white p-2.5 rounded-lg transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
              >
                <X className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-white hover:bg-rose-500 text-rose-500 hover:text-white p-2.5 rounded-lg transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-rose-800">
              Quick Links
            </h3>
            <ul className="space-y-2.5">{links}</ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-rose-800">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {[
                " 🐶 Pets (Adoption)",
                "🍖 Pet Food",
                " 🎾 Accessories",
                "🧴 Pet Care Products",
              ].map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    className="text-rose-600 hover:text-rose-800 hover:translate-x-1 inline-block transition-all duration-200 text-sm"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-rose-800">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                <span className="text-rose-700">
                  123 Rajshahi, Dhaka City, BD
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="text-rose-700">+88 (017) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="text-rose-700">
                  sojibahmed.mailme@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-rose-200 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2 text-rose-800">
              Stay Updated
            </h3>
            <p className="text-rose-600 text-sm mb-4">
              Subscribe to get special offers and updates
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-lg bg-white border border-rose-200 text-rose-900 placeholder-rose-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all text-sm shadow-sm"
              />
              <button className="px-6 py-2.5 bg-linear-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-rose-200 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-rose-700 text-sm">
            © 2024 PawMart. All rights reserved. Made with{" "}
            <Heart className="w-3 h-3 inline fill-rose-500 text-rose-500" /> for
            pets
          </p>
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className="text-rose-600 hover:text-rose-800 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-rose-600 hover:text-rose-800 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-rose-600 hover:text-rose-800 transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
