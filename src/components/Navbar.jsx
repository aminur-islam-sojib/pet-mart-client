import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import useTheme from "../Hooks/useTheme";
import logo from "../assets/logo.png";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logOut, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wanna Log Out this account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire({
          title: "Log Out!",
          text: "Your account successfully log out.",
          icon: "success",
        });
      }
    });
  };

  const links = (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <NavLink to="/" className="hover:text-rose-500">
          Home
        </NavLink>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <NavLink to="/pets-supplies" className="hover:text-rose-500">
          Pets & Supplies
        </NavLink>
      </motion.div>

      {user && (
        <>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <NavLink to="/add-listing" className="hover:text-rose-500">
              Add Listing
            </NavLink>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <NavLink to="/my-listings" className="hover:text-rose-500">
              My Listings
            </NavLink>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <NavLink to="/my-orders" className="hover:text-rose-500">
              My Orders
            </NavLink>
          </motion.div>
        </>
      )}
    </>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="PawMart Logo"
            className="w-8 h-8 object-contain"
          />
          <h1 className="text-xl font-bold text-rose-600">PawMart</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 text-gray-700 dark:text-gray-200 font-medium">
          {links}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ rotate: 20, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          {user ? (
            <>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-classic"
              >
                Logout
              </motion.button>

              {/* 🧩 User Avatar with Tooltip */}
              <div className="dropdown dropdown-end rounded-full">
                <div
                  id="user-avatar"
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                  data-tooltip-content={`${
                    user?.displayName || "Anonymous"
                  }\n ${user?.email || "No email"}`}
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt={user?.displayName}
                      src={user?.photoURL || "/default-avatar.png"}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/login" className="btn-classic-outline">
                  Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/register" className="btn-classic">
                  Register
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white dark:bg-slate-900 border-t py-4 px-6 flex flex-col gap-4 text-gray-700 dark:text-gray-200 font-medium"
        >
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition w-fit flex items-center gap-2"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-sm">
              {theme === "dark" ? "Light" : "Dark"}
            </span>
          </button>

          {links}

          {user ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border"
                />
                <p className="text-sm">{user.displayName}</p>
              </div>
              <button onClick={handleLogout} className="btn-classic">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-classic-outline">
                Login
              </Link>
              <Link to="/register" className="btn-classic">
                Register
              </Link>
            </>
          )}
        </motion.div>
      )}

      {/* Tooltip for User Avatar */}
      <Tooltip
        anchorSelect="#user-avatar"
        place="bottom"
        delayShow={100}
        style={{
          backgroundColor: "#333",
          color: "#fff",
          fontSize: "13px",
          borderRadius: "8px",
          padding: "6px 10px",
          zIndex: 9999,
          whiteSpace: "pre-line",
        }}
      />
    </motion.nav>
  );
};

export default Navbar;
