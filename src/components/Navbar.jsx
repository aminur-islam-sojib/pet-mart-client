import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import useAuth from "../Hooks/useAuth";
import useTheme from "../Hooks/useTheme";
import logo from "../assets/logo.png";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { logOut, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "  You are wanna Log Out this account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
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
    <nav className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50">
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
        <div className="hidden md:flex items-center gap-4 text-gray-700 dark:text-gray-200 font-medium">
          {links}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <button onClick={handleLogout} className=" btn-classic">
                Logout
              </button>
              <div className="dropdown dropdown-end  rounded-full">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt={user?.displayName} src={user?.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <p>{user?.displayName}</p>
                    <p>{user?.email}</p>
                  </li>
                </ul>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                title={theme === "dark" ? "Switch to light" : "Switch to dark"}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
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
        <div className="md:hidden bg-white dark:bg-slate-900 border-t py-4 px-6 flex flex-col gap-4 text-gray-700 dark:text-gray-200 font-medium">
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
