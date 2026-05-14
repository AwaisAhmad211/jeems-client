import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      // Level 1: Item ID
      for (const items in cartItems) {
        // Level 2: Size
        for (const size in cartItems[items]) {
          // Level 3: Color (The new layer we added)
          for (const color in cartItems[items][size]) {
            if (cartItems[items][size][color] > 0) {
              tempData.push({
                _id: items,
                size: size,
                color: color, // Store color for the UI
                quantity: cartItems[items][size][color],
              });
            }
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 page-transition bg-[var(--color-bg-page)] min-h-screen px-4 md:px-10 lg:px-20">
      <div className="text-2xl mb-6">
        <Title text1={"YOUR"} text2={"COLLECTION"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id,
          );

          // Find the hex code for the color dot
          const colorObj = productData?.colors?.find(
            (c) => c.name === item.color,
          );

          return (
            <div
              key={index}
              className="py-6 border-t border-b border-gray-100 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData.images[0]}
                  className="w-16 sm:w-24 object-cover"
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-serif italic text-[var(--color-primary-dark)]">
                    {productData.name}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <p className="text-sm font-light text-gray-500">
                      {currency}
                      {productData.price.toLocaleString()}
                    </p>

                    {/* Size Badge */}
                    <p className="px-2 py-0.5 text-[10px] border border-gray-200 bg-white text-gray-400 uppercase tracking-widest">
                      {item.size}
                    </p>

                    {/* Color Badge with Dot */}
                    <div className="flex items-center gap-2 px-2 py-0.5 border border-gray-200 bg-white">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: colorObj?.code || "#ccc" }}
                      />
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                        {item.color}
                      </p>
                    </div>

                    <p
                      className={`text-[10px] font-bold uppercase tracking-tighter ${productData.stock < 5 ? "text-red-500" : "text-gray-400"}`}
                    >
                      {productData.stock < 10
                        ? `Only ${productData.stock} left`
                        : "In Stock"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <input
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || val === "0") return;

                  const requestedQty = Number(val);
                  const availableStock = productData.stock;

                  if (requestedQty > availableStock) {
                    // Optional: alert the user or use a toast
                    // toast.error(`Only ${availableStock} items available in stock`);
                    updateQuantity(
                      item._id,
                      item.size,
                      availableStock,
                      item.color,
                    );
                  } else {
                    updateQuantity(
                      item._id,
                      item.size,
                      requestedQty,
                      item.color,
                    );
                  }
                }}
                className="border border-gray-100 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center bg-white"
                type="number"
                min="1"
                max={productData.stock} // Set the max attribute for the browser
                value={item.quantity} // Use value instead of defaultValue for controlled behavior
              />

              {/* Remove Icon */}
              <img
                onClick={() =>
                  updateQuantity(item._id, item.size, 0, item.color)
                }
                src={assets.bin_icon}
                className="w-4 mr-4 sm:w-5 cursor-pointer hover:opacity-60 transition-opacity"
                alt="Remove"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-[var(--color-primary-dark)] text-white text-[11px] font-bold tracking-[0.3em] my-8 px-10 py-4 uppercase hover:bg-[var(--color-primary-dark-hover)] transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
