import { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Loader2, Ticket, X, CheckCircle2 } from "lucide-react";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    backendUrl,
    cartItems,
    setCartItems,
    dbCartData,
    setDbCartData,
    getCartAmount,
    getTotalAmount,
    getDeliveryFee,
    selectedShipping,
    products,
    discount,
    setDiscount,
    appliedCoupon,
    setAppliedCoupon,
    resetDiscount,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  /**
   * Helper function to transform cart (DB or Local) into a flat array for the backend
   */
  /**
   * Helper function to transform cart (DB or Local) into a flat array for the backend
   */
  const prepareOrderItems = () => {
    let orderItems = [];

    // 1. Check if user has Database Cart Data (Logged In)
    if (dbCartData && dbCartData.length > 0) {
      orderItems = dbCartData.map((item) => {
        // Extract real ID safely whether populated or unpopulated
        const realId = item.product?._id || item.productId || item._id;
        const realName = item.product?.name || item.name || "Item";

        return {
          _id: String(realId),
          name: realName,
          price: item.product?.price || item.price || 0,
          image: item.product?.image || item.image || [],
          size: item.size,
          color: item.color,
          quantity: item.quantity,
        };
      });
      return orderItems;
    }

    // 2. Check Local Cart Object (Guest User)
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        for (const color in cartItems[itemId][size]) {
          const quantity = cartItems[itemId][size][color];
          if (quantity > 0) {
            const productMatch = products.find(
              (p) => String(p._id) === String(itemId)
            );
            if (productMatch) {
              orderItems.push({
                _id: String(productMatch._id),
                name: productMatch.name,
                price: productMatch.price,
                image: productMatch.image,
                size: size,
                color: color,
                quantity: quantity,
              });
            }
          }
        }
      }
    }
    return orderItems;
  };

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return toast.error("Enter a code");
    setIsCouponLoading(true);
    try {
      const response = await axiosInstance.post(
        `${backendUrl}/api/coupon/apply`,
        {
          code: couponInput.toUpperCase(),
          total: getCartAmount(),
        }
      );

      if (response.data.success) {
        const discountVal = Number(response.data.discount);
        setDiscount(discountVal);
        setAppliedCoupon(couponInput.toUpperCase());
        toast.success("Coupon applied!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid coupon code");
      resetDiscount();
    } finally {
      setIsCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
    setCouponInput("");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (loading) return;

    const orderItems = prepareOrderItems();

    // Empty Cart Validation Check
    if (!orderItems || orderItems.length === 0) {
      return toast.error("Your cart is empty");
    }

    // Stock Level Validation
    for (const item of orderItems) {
      const currentProduct = products.find(
        (p) => String(p._id) === String(item._id)
      );
      if (currentProduct && item.quantity > currentProduct.stock) {
        return toast.error(
          `Sorry, only ${currentProduct.stock} units of ${item.name} are available.`
        );
      }
    }

    setLoading(true);

    try {
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalAmount(), // Uses dynamic total calculation
        deliveryFee: getDeliveryFee(),
        shippingMethodId: selectedShipping?._id || null,
        couponApplied: !!appliedCoupon,
        couponCode: appliedCoupon || "",
        discount: discount || 0,
      };

      switch (method) {
        case "cod": {
          const response = await axiosInstance.post(
            `${backendUrl}/api/order/place`,
            orderData
          );
          if (response.data.success) {
            setCartItems({});
            if (setDbCartData) setDbCartData([]);
            resetDiscount();
            navigate("/orders");
            toast.success("Order placed successfully");
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        case "stripe": {
          toast.info("Stripe integration coming soon");
          break;
        }
        case "razorpay": {
          toast.info("Razorpay integration coming soon");
          break;
        }
        default:
          toast.error("Please select a payment method");
          break;
      }
    } catch (error) {
      console.error("Order Error:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Side: Delivery Info */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* Right Side: Cart Summary & Payment */}
      <div className="mt-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Ticket size={18} className="text-[var(--color-primary-dark)]" />
            <p className="text-sm font-serif italic text-[var(--color-primary-dark)]">
              Apply Coupon
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="PROMO CODE"
              className="border border-gray-300 rounded-sm py-2 px-4 w-full outline-none focus:border-[var(--color-primary-dark)] text-xs uppercase tracking-widest"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              disabled={!!appliedCoupon}
            />
            {!appliedCoupon ? (
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={isCouponLoading}
                className="bg-black text-white px-6 py-2 text-[10px] font-bold tracking-widest hover:bg-[var(--color-primary-dark)] transition-all disabled:bg-gray-400"
              >
                {isCouponLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  "APPLY"
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={removeCoupon}
                className="bg-red-50 text-red-600 border border-red-100 px-6 py-2 text-[10px] font-bold tracking-widest hover:bg-red-100"
              >
                <X size={14} />
              </button>
            )}
          </div>
          {appliedCoupon && (
            <div className="flex items-center gap-1 mt-2 text-green-700">
              <CheckCircle2 size={12} />
              <p className="text-[10px] font-bold uppercase tracking-tighter">
                Code {appliedCoupon} active!
              </p>
            </div>
          )}
        </div>
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            {/* COD Payment Toggle */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4 uppercase">
                Cash on Delivery
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-16 py-3 text-sm active:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-3 ml-auto transition-all"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "PROCESSING..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;