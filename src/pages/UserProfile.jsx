import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import {
  Package,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  Loader2,
} from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import Orders from "./Orders";
import AccountSettings from "../components/AccountSettings";
import { toast } from "react-toastify";

const Profile = () => {
  const { navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [userProfile, setUserProfile] = useState(null);
  const [userLastOrder, setUserLastOrder] = useState([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dummyAddresses = [
    {
      id: 1,
      type: "Home",
      street: "123 Luxury Lane",
      city: "Lahore",
      zip: "54000",
      default: true,
    },
  ];

  const getUserOrders = async () => {
    try {
      const res = await axiosInstance.get("/api/order/lastOrder");
      setUserLastOrder(res.data.order);
    } catch (error) {
      console.error("Failed to fetch user orders:", error);
    }
  };

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
      getUserOrders();
    } else {
      setUserProfile(null);
      setUserLastOrder([]);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-[var(--color-bg-page)] pt-32 pb-20 px-4 sm:px-16 page-transition">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-[var(--color-primary-dark)] rounded-full flex items-center justify-center text-white text-3xl font-serif">
              {userProfile ? userProfile.name.charAt(0) : "U"}
            </div>
            <div>
              <h1 className="text-3xl font-serif text-[var(--color-primary-dark)]">
                {userProfile ? userProfile.name : "User Name"}
              </h1>
              <p className="text-gray-500 font-light text-sm">
                {userProfile ? userProfile.email : "User Email"}
              </p>
              {/* <div className="mt-2 flex gap-2">
                <span className="bg-[#7fb519]/10 text-[#7fb519] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                  {user.tier}
                </span>
              </div> */}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center px-6 py-2 border-r border-gray-200">
              <p className="text-2xl font-bold text-[#00311F]">
                {userProfile ? userProfile.totalOrders : 0}
              </p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                Orders
              </p>
            </div>
            {/* <div className="text-center px-6 py-2">
              <p className="text-2xl font-bold text-[#00311F]">{user.points}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                Points
              </p>
            </div> */}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar Navigation */}
          <aside className="space-y-2">
            {/* { id: "address", label: "Addresses", icon: <MapPin size={18} /> }, */}
            {/* { id: "wishlist", label: "Wishlist", icon: <Heart size={18} /> }, */}
            {[
              { id: "overview", label: "Overview", icon: <User size={18} /> },
              { id: "orders", label: "Orders", icon: <Package size={18} /> },
              {
                id: "settings",
                label: "Account Settings",
                icon: <Settings size={18} />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all text-sm font-medium ${
                  activeTab === tab.id
                    ? "bg-[#00311F] text-white shadow-xl shadow-[#00311F]/20"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            <button
              onClick={logout}
              disabled={isLoggingOut}
              className={`w-full flex items-center gap-4 px-6 py-4 mt-6 rounded-xl transition-all text-sm font-medium border border-transparent ${
                isLoggingOut
                  ? "bg-red-50 text-red-300 cursor-not-allowed"
                  : "text-red-500 hover:bg-red-50"
              }`}
            >
              {isLoggingOut ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut size={18} /> Logout
                </>
              )}
            </button>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm min-h-[500px]">
              {/* TAB: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="animate-in fade-in duration-500">
                  <h2 className="text-xl font-serif text-[#00311F] mb-6">
                    Recent Activity
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 bg-[#f8faf5] rounded-2xl border border-[#7fb519]/10 transition-all hover:shadow-md">
                      <Clock className="text-[#7fb519] mb-4" />
                      <p className="text-sm font-semibold text-[#00311F]">
                        Last Order
                      </p>

                      {userLastOrder ? (
                        <div className="mt-1">
                          <p className="text-[11px] font-bold text-[#7fb519] uppercase tracking-tighter">
                            {userLastOrder.status}
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed mt-1">
                            Order{" "}
                            <span className="text-[#00311F] font-medium">
                              #{userLastOrder.orderNumber}
                            </span>
                            {userLastOrder.items?.length > 0 && (
                              <>
                                {" "}
                                for
                                <br />
                                <span className="italic">
                                  {userLastOrder.items[0].name}
                                </span>
                              </>
                            )}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-2 font-light">
                            Placed on{" "}
                            {new Date(userLastOrder.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 mt-1 italic">
                          No orders placed yet.
                        </p>
                      )}
                    </div>
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                    Membership Benefits
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-600">
                      <ChevronRight size={14} className="text-[#7fb519]" /> Free
                      shipping on all Couture items.
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-600">
                      <ChevronRight size={14} className="text-[#7fb519]" />{" "}
                      Early access to Luxury Pret launches.
                    </li>
                  </ul>
                </div>
              )}

              {/* TAB: ORDERS */}
              {activeTab === "orders" && (
                <div className="animate-in slide-in-from-right-4 duration-500">
                  <Orders />
                </div>
              )}

              {/* TAB: ADDRESS */}
              {activeTab === "address" && (
                <div className="animate-in slide-in-from-right-4 duration-500">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-serif text-[#00311F]">
                      Address Book
                    </h2>
                    <button className="text-xs font-bold text-[#7fb519] border border-[#7fb519] px-4 py-2 rounded-full hover:bg-[#7fb519] hover:text-white transition-all">
                      + Add New
                    </button>
                  </div>
                  {dummyAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-6 border border-[#00311F]/10 rounded-2xl relative"
                    >
                      {addr.default && (
                        <span className="absolute top-4 right-4 text-[8px] font-bold uppercase bg-[#00311F] text-white px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                      <p className="text-sm font-bold text-[#00311F] mb-2">
                        {addr.type} Address
                      </p>
                      <p className="text-sm text-gray-500 font-light leading-relaxed">
                        {addr.street}
                        <br />
                        {addr.city}, {addr.zip}
                      </p>
                      <div className="mt-4 flex gap-4 text-xs font-bold text-[#7fb519]">
                        <button className="hover:underline">Edit</button>
                        <button className="hover:underline text-gray-300">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Placeholder for other tabs */}
              {activeTab === "wishlist" && (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Settings className="text-gray-300" />
                  </div>
                  <p className="text-gray-400 text-sm italic font-serif">
                    The {activeTab} module is being curated...
                  </p>
                </div>
              )}

              {/* TAB: SETTINGS */}
              {activeTab === "settings" && (
                <AccountSettings userProfile={userProfile} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
