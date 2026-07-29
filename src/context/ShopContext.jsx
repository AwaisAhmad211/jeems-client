import { createContext, useEffect, useState } from "react";
import axios from "axios"; 
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "PKR ";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [dbCartData, setDbCartData] = useState([]); 
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // --- Dynamic Shipping States ---
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");

  const navigate = useNavigate();

  /* ---------------- PRODUCTS (PUBLIC) ---------------- */

  const getProductsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/product/list`);
      setProducts(data.products || []);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  /* ---------------- SHIPPING METHODS (PUBLIC) ---------------- */

  const getShippingMethods = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/shipping`);
      if (data.success && data.data.length > 0) {
        setShippingMethods(data.data);
        // Default select the first method or one marked as isDefault
        const defaultMethod = data.data.find((item) => item.isDefault) || data.data[0];
        setSelectedShipping(defaultMethod);
      }
    } catch (error) {
      console.log("Error fetching shipping methods:", error);
    }
  };

  /* ---------------- CART (PROTECTED) ---------------- */

 const addToCart = async (itemId, size, color, productFromComponent = null) => {
  if (!color || !size) {
    toast.error("Please select Color and Size");
    return;
  }

  // Safe string matching
  const product =
    productFromComponent ||
    products.find((p) => String(p._id) === String(itemId));

  if (!product) {
    toast.error("Product not found");
    return;
  }

  if (product.stock <= 0) {
    toast.error("Product is out of stock");
    return;
  }

  // 1. Local State Update
  let cartData = structuredClone(cartItems || {});
  if (!cartData[itemId]) cartData[itemId] = {};
  if (!cartData[itemId][size]) cartData[itemId][size] = {};

  cartData[itemId][size][color] = (cartData[itemId][size][color] || 0) + 1;
  setCartItems(cartData);

  toast.success("Added to cart");

  // 2. Backend Call (Agar user logged in hai)
  if (token) {
    try {
      await axiosInstance.post("/api/cart/add", { itemId, size, color });
      await getUserCart(); // Wait for database sync before leaving page
    } catch (error) {
      console.log("Cart add backend error:", error);
      toast.error("Unable to sync cart with database");
    }
  }

  // 3. Navigate after state update
  navigate("/cart");
};

  const resetDiscount = () => {
    setDiscount(0);
    setAppliedCoupon(null);
  };

  const updateQuantity = async (itemId, size, quantity, color) => {
    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};
    if (!cartData[itemId][size]) cartData[itemId][size] = {};
    
    cartData[itemId][size][color] = quantity;
    setCartItems(cartData);

    try {
      await axiosInstance.post("/api/cart/update", {
        itemId,
        size,
        quantity,
        color,
      });
      await getUserCart();
    } catch {
      toast.error("Failed to update cart");
    }
  };

  const getUserCart = async () => {
    if (!token) return;
    try {
      const { data } = await axiosInstance.get("/api/cart/get");
      if (data.success && data.cartItems) {
        setDbCartData(data.cartItems);

        let structuralCart = {};
        data.cartItems.forEach((item) => {
          if (!structuralCart[item._id]) structuralCart[item._id] = {};
          if (!structuralCart[item._id][item.size]) structuralCart[item._id][item.size] = {};
          structuralCart[item._id][item.size][item.color] = item.quantity;
        });
        setCartItems(structuralCart);
      }
    } catch (error) {
      console.log("Silent cart fetch log:", error.message);
    }
  };

  /* ---------------- HELPERS ---------------- */

  const getCartCount = () => {
    if (dbCartData && dbCartData.length > 0) {
      return dbCartData.reduce((total, item) => total + item.quantity, 0);
    }
    
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
  // Agar Logged in User ka Database Cart Data maujood hai
  if (dbCartData && dbCartData.length > 0) {
    return dbCartData.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  }

  // Guest / Local state Cart Items logic
  let total = 0;
  for (const itemId in cartItems) {
    // String cast kar ke match karna bohot zaroori hai (ObjectId vs String bug fix)
    const product = products.find((p) => String(p._id) === String(itemId));
    if (!product) continue;

    for (const size in cartItems[itemId]) {
      for (const color in cartItems[itemId][size]) {
        const qty = cartItems[itemId][size][color];
        if (qty > 0) {
          total += product.price * qty;
        }
      }
    }
  }
  return total;
};

  // Dynamically calculate delivery fee based on selected method & free shipping threshold
  const getDeliveryFee = () => {
    if (!selectedShipping) return 0;

    const subtotal = getCartAmount();
    
    // Check if free shipping applies
    if (
      selectedShipping.freeShippingThreshold !== null &&
      subtotal >= selectedShipping.freeShippingThreshold
    ) {
      return 0;
    }

    return selectedShipping.cost || 0;
  };

  // Total amount = Subtotal - Discount + Delivery Fee
  const getTotalAmount = () => {
    const subtotal = getCartAmount();
    if (subtotal === 0) return 0;
    const currentDeliveryFee = getDeliveryFee();
    return Math.max(0, subtotal - discount + currentDeliveryFee);
  };

  /* ---------------- EFFECTS ---------------- */

  useEffect(() => {
    getProductsData();
    getShippingMethods(); // Fetch shipping options when app loads
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
    delivery_fee: getDeliveryFee(), // Backwards compatibility for old components
    getDeliveryFee,
    shippingMethods,
    selectedShipping,
    setSelectedShipping,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    dbCartData, 
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    getTotalAmount,
    getUserCart, 
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