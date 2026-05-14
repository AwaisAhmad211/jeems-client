import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, discount } =
    useContext(ShopContext);

  const subtotal = getCartAmount();
  // Calculate total: Subtotal + Fee - Discount (ensure it doesn't go below 0)
  const total =
    subtotal === 0 ? 0 : Math.max(0, subtotal + delivery_fee - discount);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {subtotal.toLocaleString()}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee.toLocaleString()}
          </p>
        </div>

        {/* Only show discount row if a discount exists */}
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
