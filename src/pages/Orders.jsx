import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axiosInstance from "../utils/axiosInstance";
import {
  X,
  CheckCircle2,
  Package,
  Truck,
  Home,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Orders = () => {
  const { token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Pagination & Search States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const loadOrderData = async (page = 1, search = "") => {
    try {
      if (!token) return;
      setLoading(true);
      // Pass page and search as query parameters
      const response = await axiosInstance.get(
        `/api/order/userOrders?page=${page}&search=${search}`,
      );
      if (response.data.success) {
        setOrderData(response.data.orders);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData(1, searchQuery);
  }, [token, searchQuery]); // Re-fetch when token or search changes

  const phases = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out for delivery",
    "Delivered",
  ];
  const currentPhaseIndex = (status) => phases.indexOf(status);

  return (
    <div className="min-h-[50vh] pt-16 bg-[var(--color-bg-page)] px-4 md:px-20 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <Title text1={"PURCHASE"} text2={"HISTORY"} />

        {/* --- SEARCH BAR --- */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search Order Number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 px-4 py-2 pl-10 text-xs focus:outline-none focus:border-[var(--color-primary-dark)] rounded-sm transition-all"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          /* Skeleton Loader Logic... */
          [1, 2].map((n) => (
            <div key={n} className="h-40 bg-gray-100 animate-pulse mb-4" />
          ))
        ) : orderData.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-gray-200">
            <Package className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="font-serif italic text-gray-500">No orders found.</p>
          </div>
        ) : (
          orderData.map((order, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 mb-6 rounded-sm overflow-hidden hover:border-[var(--color-accent-lime)]/30 transition-all"
            >
              {/* Your existing Order Mapping UI (Header, Items, Footer) */}
              {/* ... (Keep the mapping logic you provided in the previous prompt) ... */}
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Order Number
                  </p>
                  <p className="text-sm font-serif italic">
                    {order.orderNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Total Paid
                  </p>
                  <p className="text-sm font-bold text-[var(--color-primary-dark)]">
                    {currency}
                    {order.amount}
                  </p>
                </div>
              </div>
              {/* Item list mapping... */}
              <div className="divide-y divide-gray-50">
                {order.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="p-6 flex items-center gap-6">
                    <img
                      className="w-16 aspect-[3/4] object-cover"
                      src={item.images?.[0]}
                      alt=""
                    />
                    <div className="flex-1">
                      <p className="text-[var(--color-primary-dark)] font-serif italic">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        Qty: {item.quantity} | Size: {item.size} | Color:{" "}
                        {item.color}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 flex justify-between items-center border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${order.status === "Delivered" ? "bg-green-500" : "bg-[var(--color-accent-lime)]"}`}
                  ></span>
                  <p className="text-[10px] font-bold uppercase tracking-widest">
                    {order.status}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-[10px] font-bold border border-black px-4 py-2 hover:bg-black hover:text-white transition-all"
                >
                  TRACK ORDER
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- PAGINATION CONTROLS --- */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => loadOrderData(currentPage - 1, searchQuery)}
            className="p-2 border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[10px] font-bold tracking-widest uppercase">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => loadOrderData(currentPage + 1, searchQuery)}
            className="p-2 border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Tracking Modal (keep your existing implementation here) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md p-8 rounded-sm relative shadow-2xl animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-10">
              <p className="text-[10px] tracking-[0.4em] text-[var(--color-accent-lime)] font-bold uppercase mb-2">
                Live Tracking
              </p>
              <h2 className="font-serif italic text-2xl text-[var(--color-primary-dark)]">
                Order #{selectedOrder.orderNumber}
              </h2>
            </div>

            <div className="relative space-y-8 px-4">
              <div className="absolute left-[29px] top-2 bottom-2 w-[1px] bg-gray-100"></div>
              <div
                className="absolute left-[29px] top-2 w-[1px] bg-[var(--color-accent-lime)] transition-all duration-1000"
                style={{
                  height: `${(currentPhaseIndex(selectedOrder.status) / (phases.length - 1)) * 100}%`,
                }}
              ></div>

              {phases.map((phase, idx) => {
                const isActive = idx <= currentPhaseIndex(selectedOrder.status);
                const isCurrent =
                  idx === currentPhaseIndex(selectedOrder.status);
                return (
                  <div
                    key={phase}
                    className="flex items-center gap-6 relative z-10"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${isActive ? "bg-[var(--color-primary-dark)] border-[var(--color-primary-dark)] text-white" : "bg-white border-gray-100 text-gray-200"}`}
                    >
                      {idx === 0 && <Clock size={14} />}
                      {idx === 1 && <Package size={14} />}
                      {idx === 2 && <Truck size={14} />}
                      {idx === 3 && <Package size={14} />}
                      {idx === 4 && <Home size={14} />}
                    </div>
                    <div>
                      <p
                        className={`text-[11px] tracking-widest uppercase font-bold ${isActive ? "text-[var(--color-primary-dark)]" : "text-gray-300"}`}
                      >
                        {phase}
                      </p>
                      {isCurrent && (
                        <p className="text-[9px] text-[var(--color-accent-lime)] font-light animate-pulse tracking-widest uppercase mt-0.5">
                          In Progress
                        </p>
                      )}
                    </div>
                    {isActive && (
                      <CheckCircle2
                        size={16}
                        className="ml-auto text-[var(--color-accent-lime)] animate-in zoom-in"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-12 py-4 bg-[var(--color-primary-dark)] text-white text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-black transition-colors"
            >
              Close Tracker
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
