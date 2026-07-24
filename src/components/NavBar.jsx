import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import {
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Loader2,
} from "lucide-react"; // npm install lucide-react

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const {
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const [userProfile, setUserProfile] = useState(null);

  // Handle scroll effect for luxury sticky feel
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getUserProfile = async () => {
    try {
      const res = await axiosInstance.get("/api/user/profile");
      setUserProfile(res.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const logout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await axiosInstance.post("/api/user/logout");
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      setCartItems({});
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setToken("");
      setIsLoggingOut(false);
      toast.success("Logged out Successfully");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (token) {
      getUserProfile();
    } else {
      setUserProfile(null);
    }
  }, [token]);

  return (
    <nav
      className={`sticky top-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-bg-light-gray)] py-3 shadow-sm"
          : "bg-[var(--color-bg-light-gray)] py-5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between sm:px-16 px-6">
        {/* Logo - Centered or Left depending on preference */}
        <Link
          to="/"
          className="transition-transform duration-300 hover:scale-105"
        >
          <img
            src={assets.ms_green_logo}
            className="w-20 md:w-24"
            alt="Mahnoor Sahi"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-10 text-[11px] font-semibold tracking-[0.25em] text-[var(--color-nav-text)]">
          {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item) => (
            <li key={item}>
              <NavLink
                to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `relative pb-1 group transition-colors hover:text-[var(--color-nav-text-active)] ${isActive ? "text-[var(--color-nav-text-active)]" : ""}`
                }
              >
                {item}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--color-nav-text-active)] transition-all duration-300 group-hover:w-full active-link-line`}
                ></span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Action Icons */}
        <div className="flex items-center gap-5 md:gap-8">
          {/* Profile Dropdown */}
          <div className="group relative">
            <User
              onClick={() => (token ? null : navigate("/login"))}
              className="w-5 h-5 cursor-pointer text-[var(--color-primary-dark)] hover:text-[var(--color-accent-lime)] transition-colors"
            />
            {token && (
              <div className="absolute right-0 top-full pt-4 hidden group-hover:block transition-all duration-300 z-50">
                <div className="w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="bg-[var(--color-bg-cream-light)] px-6 py-4 border-b border-gray-100 text-center">
                    <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                      Account
                    </p>
                    <p className="text-xs font-bold text-[var(--color-primary-dark)]">
                      {userProfile && userProfile.name
                        ? userProfile.name
                        : "User"}
                    </p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full flex items-center justify-between px-4 py-3 text-xs text-gray-600 hover:bg-[var(--color-bg-green-light)] rounded-xl transition-all"
                    >
                      My Profile{" "}
                      <ChevronRight size={14} className="opacity-40" />
                    </button>
                    {/* <button
                      onClick={() => navigate("/orders")}
                      className="w-full flex items-center justify-between px-4 py-3 text-xs text-gray-600 hover:bg-[var(--color-bg-green-light)] rounded-xl transition-all"
                    >
                      Orders <ChevronRight size={14} className="opacity-40" />
                    </button> */}
                    <div className="h-[1px] bg-gray-50 my-1 mx-2" />
                    <button
                      onClick={logout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-2 px-4 py-3 text-xs text-red-500 hover:bg-red-50 rounded-xl transition-all font-semibold disabled:opacity-50"
                    >
                      {isLoggingOut ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <LogOut size={14} />
                      )}
                      {isLoggingOut ? "Processing..." : "Logout"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative group">
            <ShoppingBag className="w-5 h-5 text-[var(--color-primary-dark)] group-hover:text-[var(--color-accent-lime)] transition-colors" />
            <span className={`absolute -right-2 -bottom-2 w-4 h-4 bg-[var(--color-primary-dark)] text-white text-[9px] flex items-center justify-center rounded-full border-2 group-hover:bg-[var(--color-accent-lime)] transition-colors border-[var(--color-bg-cream-warm)]`}>
              {getCartCount()}
            </span>
          </Link>

          {/* Mobile Menu Trigger */}
          <Menu
            onClick={() => setVisible(true)}
            className="w-6 h-6 cursor-pointer text-[var(--color-primary-dark)] lg:hidden"
          />
        </div>

        {/* Mobile Side Menu */}
        <div
          className={`fixed top-0 right-0 bottom-0 z-[110] bg-white transition-all duration-500 ease-out shadow-2xl ${visible ? "w-full sm:w-[400px]" : "w-0"}`}
        >
          <div className="flex flex-col h-full bg-white text-[var(--color-primary-dark)]">
            <div className="flex items-center justify-between p-6 border-b border-gray-50">
              <span className="text-[10px] tracking-[0.3em] font-bold uppercase">
                Menu
              </span>
              <X
                onClick={() => setVisible(false)}
                className="w-6 h-6 cursor-pointer opacity-50 hover:opacity-100"
              />
            </div>

            <div className="flex flex-col py-8 px-10 gap-8">
              {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item) => (
                <NavLink
                  key={item}
                  onClick={() => setVisible(false)}
                  className="text-2xl font-serif tracking-tight hover:italic hover:pl-2 transition-all"
                  to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                >
                  {item.charAt(0) + item.slice(1).toLowerCase()}
                </NavLink>
              ))}
            </div>

            {/* Mobile Bottom Section */}
            <div className="mt-auto p-10 bg-[var(--color-bg-almost-white)]">
              {!token ? (
                <button
                  onClick={() => {
                    navigate("/login");
                    setVisible(false);
                  }}
                  className="w-full bg-[var(--color-primary-dark)] text-white py-4 rounded-full text-xs tracking-widest uppercase"
                >
                  Login / Sign Up
                </button>
              ) : (
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-widest opacity-40">
                    My Account
                  </p>
                  <button
                    onClick={() => {
                      navigate("/orders");
                      setVisible(false);
                    }}
                    className="block text-lg font-serif"
                  >
                    Track Orders
                  </button>
                  <button
                    disabled={isLoggingOut}
                    onClick={logout}
                    className="flex items-center gap-3 text-lg font-serif text-red-500 disabled:opacity-50"
                  >
                    {isLoggingOut && (
                      <Loader2 size={20} className="animate-spin" />
                    )}
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
