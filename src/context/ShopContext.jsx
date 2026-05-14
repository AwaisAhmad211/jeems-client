import { createContext, useEffect, useState } from "react";
import axios from "axios";
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

  const addToCart = async (itemId, size, color) => {
    if (!color || !size) {
      toast.error("Please select Color and Size");
      return;
    }

    const product = products.find((p) => p._id === itemId);
    if (product.stock <= 0) {
      toast.error("Product is out of stock");
      return;
    }

    let cartData = structuredClone(cartItems || {});

    if (!cartData[itemId]) cartData[itemId] = {};
    if (!cartData[itemId][size]) cartData[itemId][size] = {};

    cartData[itemId][size][color] = (cartData[itemId][size][color] || 0) + 1;

    setCartItems(cartData);
    toast.success("Added to cart");
    navigate("/cart");

    try {
      await axiosInstance.post("/api/cart/add", { itemId, size, color });
    } catch  {
      toast.error("Unable to add to cart");
    }
  };

  const resetDiscount = () => {
    setDiscount(0);
    setAppliedCoupon(null);
  };

  const updateQuantity = async (itemId, size, quantity, color) => {
    let cartData = structuredClone(cartItems);

    // Update the 3rd level
    cartData[itemId][size][color] = quantity;

    setCartItems(cartData);

    try {
      // Ensure your backend endpoint is updated to receive "color" as well
      await axiosInstance.post("/api/cart/update", {
        itemId,
        size,
        quantity,
        color,
      });
    } catch  {
      toast.error("Failed to update cart");
    }
  };

  const getUserCart = async () => {
    try {
      const { data } = await axiosInstance.get("/api/cart/get");
      setCartItems(data.cartData || {});
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- HELPERS ---------------- */

  const getCartCount = () => {
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
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
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
