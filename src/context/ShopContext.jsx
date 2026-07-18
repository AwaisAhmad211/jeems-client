import { createContext, useEffect, useState } from "react";
import axios from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "PKR ";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [dbCartData, setDbCartData] = useState([]); // Added production-level populated array state
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");

  const navigate = useNavigate();

  /* ---------------- PRODUCTS (PUBLIC) ---------------- */

  const getProductsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/product/list`);
      setProducts(data.products || []);
    } catch {
      toast.error("Failed to load products");
    }
  };

  /* ---------------- CART (PROTECTED) ---------------- */

  const addToCart = async (itemId, size, color, productFromComponent = null) => {
    if (!color || !size) {
      toast.error("Please select Color and Size");
      return;
    }

    const product = productFromComponent || products.find((p) => p._id === itemId);
    console.log("Adding to cart:", { itemId, size, color, product });
    if (!product) {
      toast.error("Product not found");
      return;
    }
    if (product.stock <= 0) {
      toast.error("Product is out of stock");
      return;
    }

    // Update local nested cartItems for instant local UI feedback if needed elsewhere
    let cartData = structuredClone(cartItems || {});
    if (!cartData[itemId]) cartData[itemId] = {};
    if (!cartData[itemId][size]) cartData[itemId][size] = {};
    cartData[itemId][size][color] = (cartData[itemId][size][color] || 0) + 1;
    setCartItems(cartData);

    toast.success("Added to cart");
    navigate("/cart");

    try {
      await axiosInstance.post("/api/cart/add", { itemId, size, color });
      // Refresh the populated array structure from server immediately after adding
      getUserCart();
    } catch  {
      toast.error("Unable to add to cart");
    }
  };

  const resetDiscount = () => {
    setDiscount(0);
    setAppliedCoupon(null);
  };

  const updateQuantity = async (itemId, size, quantity, color) => {
    // 1. Pessimistic / Optimistic local UI handling for nested object tracker
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]?.[size]) {
      cartData[itemId][size][color] = quantity;
      setCartItems(cartData);
    }

    try {
      await axiosInstance.post("/api/cart/update", {
        itemId,
        size,
        quantity,
        color,
      });
      // 2. Fetch freshly updated, populated item records from database to keep totals accurate
      await getUserCart();
    } catch  {
      toast.error("Failed to update cart");
    }
  };

  const getUserCart = async () => {
    try {
      const { data } = await axiosInstance.get("/api/cart/get");
      if (data.success && data.cartItems) {
        // Save production rich array layout (consumed directly by Cart.jsx)
        setDbCartData(data.cartItems);

        // Reconstruct old nested object to remain backward compatible for other layout components
        let structuralCart = {};
        data.cartItems.forEach((item) => {
          if (!structuralCart[item._id]) structuralCart[item._id] = {};
          if (!structuralCart[item._id][item.size]) structuralCart[item._id][item.size] = {};
          structuralCart[item._id][item.size][item.color] = item.quantity;
        });
        setCartItems(structuralCart);
      }
    } catch (error) {
      console.log("Error inside getUserCart:", error);
    }
  };

  /* ---------------- HELPERS ---------------- */

  const getCartCount = () => {
    // Production preference: calculate from our populated backend array if ready
    if (dbCartData && dbCartData.length > 0) {
      return dbCartData.reduce((total, item) => total + item.quantity, 0);
    }
    
    // Fallback approach using old nested local state object tracker
    let total = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        for (const color in cartItems[items][size]) {
          total += cartItems[items][size][color];
        }
      }
    }
    return total;
  };

  const getCartAmount = () => {
    // Production preference: read product price directly from database payload record
    if (dbCartData && dbCartData.length > 0) {
      return dbCartData.reduce((total, item) => {
        return total + (item.product?.price || 0) * item.quantity;
      }, 0);
    }

    // Fallback calculation logic matching pagination fallback list array elements
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        for (const color in cartItems[itemId][size]) {
          total += product.price * cartItems[itemId][size][color];
        }
      }
    }
    return total;
  };

  /* ---------------- EFFECTS ---------------- */

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token]);

  /* ---------------- CONTEXT VALUE ---------------- */

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    dbCartData, // Exposed safely to Cart.jsx layout elements
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    getUserCart, // Exposed so Cart.jsx can re-trigger hydration loops natively
    navigate,
    backendUrl,
    token,
    setToken,
    setProducts,
    discount,
    setDiscount,
    appliedCoupon,
    setAppliedCoupon,
    resetDiscount,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;