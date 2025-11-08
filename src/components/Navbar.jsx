import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useAuth from "../Hooks/useAuth";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { logOut, user } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out");
      })
      .catch((err) => console.error(err));
  };

  const navLinksBeforeLogin = (
    <>
      <NavLink to="/" className="hover:text-primary">
        Home
      </NavLink>
      <NavLink to="/pets-supplies" className="hover:text-primary">
        Pets & Supplies
      </NavLink>
    </>
  );

  const navLinksAfterLogin = (
    <>
      <NavLink to="/" className="hover:text-primary">
        Home
      </NavLink>
      <NavLink to="/pets-supplies" className="hover:text-primary">
        Pets & Supplies
      </NavLink>
      <NavLink to="/add-listing" className="hover:text-primary">
        Add Listing
      </NavLink>
      <NavLink to="/my-listings" className="hover:text-primary">
        My Listings
      </NavLink>
      <NavLink to="/my-orders" className="hover:text-primary">
        My Orders
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="PawMart Logo"
            className="w-8 h-8 object-contain"
          />
          <h1 className="text-xl font-bold text-[#f97316]">PawMart</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          {user ? navLinksAfterLogin : navLinksBeforeLogin}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border"
                  title={user.displayName || "Profile"}
                />
                <button
                  onClick={handleLogout}
                  className="bg-[#f97316] text-white px-3 py-1 rounded-md hover:bg-[#ea580c] transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-[#f97316] text-white px-3 py-1 rounded-md hover:bg-[#ea580c] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-[#f97316] text-[#f97316] px-3 py-1 rounded-md hover:bg-[#f97316] hover:text-white transition"
              >
                Register
              </Link>
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
        <div className="md:hidden bg-white border-t py-4 px-6 flex flex-col gap-4 text-gray-700 font-medium">
          {user ? navLinksAfterLogin : navLinksBeforeLogin}
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
              <button
                onClick={handleLogout}
                className="bg-[#f97316] text-white px-3 py-1 rounded-md hover:bg-[#ea580c]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-[#f97316] text-white px-3 py-1 rounded-md text-center hover:bg-[#ea580c]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-[#f97316] text-[#f97316] px-3 py-1 rounded-md text-center hover:bg-[#f97316] hover:text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
