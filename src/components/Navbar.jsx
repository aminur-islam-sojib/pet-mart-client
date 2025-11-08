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

  const links = (
    <>
      {user ? (
        <>
          <NavLink to="/" className="hover:text-rose-500">
            Home
          </NavLink>
          <NavLink to="/pets-supplies" className="hover:text-rose-500">
            Pets & Supplies
          </NavLink>
          <NavLink to="/add-listing" className="hover:text-rose-500">
            Add Listing
          </NavLink>
          <NavLink to="/my-listings" className="hover:text-rose-500">
            My Listings
          </NavLink>
          <NavLink to="/my-orders" className="hover:text-rose-500">
            My Orders
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/" className="hover:text-rose-500">
            Home
          </NavLink>
          <NavLink to="/pets-supplies" className="hover:text-rose-500">
            Pets & Supplies
          </NavLink>
        </>
      )}
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
          <h1 className="text-xl font-bold text-rose-600">PawMart</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          {links}
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
                <button onClick={handleLogout} className=" btn-classic">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-classic-outline">
                Login
              </Link>
              <Link to="/register" className=" btn-classic">
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
              <button onClick={handleLogout} className=" btn-classic">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className=" btn-classic-outline">
                Login
              </Link>
              <Link to="/register" className=" btn-classic">
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
