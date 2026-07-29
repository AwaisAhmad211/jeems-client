import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const {
    currency,
    getCartAmount,
    getTotalAmount,
    getDeliveryFee,
    discount,
    shippingMethods,
    selectedShipping,
    setSelectedShipping,
  } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const deliveryFee = getDeliveryFee();
  const total = getTotalAmount();

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {subtotal.toLocaleString()}
          </p>
        </div>
        <hr />

        {/* Shipping Method Selector (Only show if methods exist and cart is not empty) */}
        {subtotal > 0 && shippingMethods && shippingMethods.length > 0 && (
          <div className="my-2">
            <p className="font-medium text-gray-700 mb-2">Select Shipping Method:</p>
            <div className="flex flex-col gap-2">
              {shippingMethods.map((method) => {
                const isFree =
                  method.freeShippingThreshold !== null &&
                  subtotal >= method.freeShippingThreshold;

                return (
                  <label
                    key={method._id}
                    className={`flex items-center justify-between p-2.5 border rounded-lg cursor-pointer transition-all ${
                      selectedShipping?._id === method._id
                        ? "border-black bg-gray-50 font-medium"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={selectedShipping?._id === method._id}
                        onChange={() => setSelectedShipping(method)}
                        className="accent-black"
                      />
                      <div>
                        <p className="text-xs font-semibold">{method.name}</p>
                        {method.minDeliveryDays && method.maxDeliveryDays && (
                          <p className="text-[11px] text-gray-500">
                            {method.minDeliveryDays}-{method.maxDeliveryDays} business days
                          </p>
                        )}
                      </div>
                    </div>

                    <span className="text-xs">
                      {isFree ? (
                        <span className="text-green-600 font-semibold">FREE</span>
                      ) : (
                        `${currency} ${method.cost.toLocaleString()}`
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Shipping Fee Summary Line */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {deliveryFee === 0 && subtotal > 0 ? (
              <span className="text-green-600 font-medium">Free</span>
            ) : (
              `${currency} ${deliveryFee.toLocaleString()}`
            )}
          </p>
        </div>

        {/* Coupon Discount */}
        {discount > 0 && (
          <>
            <hr />
            <div className="flex justify-between text-green-700 font-medium">
              <p>Coupon Discount</p>
              <p>
                - {currency} {discount.toLocaleString()}
              </p>
            </div>
          </>
        )}

        <hr />

        {/* Final Total */}
        <div className="flex justify-between text-base font-bold">
          <p>Total</p>
          <p>
            {currency} {total.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;