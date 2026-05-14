const OrderCancellation = () => {
  return (
    <div className="bg-white text-[var(--color-primary-dark)] px-6 py-20 sm:px-16 max-w-[1000px] mx-auto font-light leading-relaxed">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl tracking-[0.2em] uppercase font-bold mb-4">
          Order Cancellation & Disclaimer
        </h1>
        <div className="h-[2px] w-20 bg-[var(--color-accent-lime)] mx-auto"></div>
      </div>

      <div className="space-y-16 text-sm md:text-base tracking-wide">
        {/* Section 1: Order Cancellation */}
        <section className="space-y-6">
          <h2 className="text-[12px] tracking-[0.4em] font-bold uppercase text-[#7fb519]">
            01. Cancellation Policy
          </h2>
          <div className="space-y-4">
            <p>
              Mahnoor Sahi does not offer a “refund” or “money-back guarantee”
              on purchased items. In the event of a cancellation, the order
              amount will not be refunded.
            </p>
            <div className="bg-gray-50 border-l-4 border-[var(--color-primary-dark)] p-6">
              <p className="font-medium">
                Instead, a{" "}
                <span className="text-[var(--color-accent-lime)]">
                  store coupon of the same value
                </span>{" "}
                will be provided, valid for use within the next 30 days.
              </p>
            </div>
            <p className="text-gray-500 text-xs md:text-sm">
              Mahnoor Sahi reserves the right to cancel orders for any reason,
              including but not limited to: out-of-stock items, damage found
              during quality checks, technical errors, or payment declines.
            </p>
          </div>
        </section>

        {/* Section 2: Privacy Note */}
        <section className="py-8 border-y border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h3 className="text-[11px] font-bold uppercase tracking-widest">
              Data Privacy
            </h3>
            <p className="text-gray-500 italic">
              &quot;We do not share customer details with any third parties.&quot;
            </p>
          </div>
        </section>

        {/* Section 3: Product Disclaimer */}
        <section className="space-y-6">
          <h2 className="text-[12px] tracking-[0.4em] font-bold uppercase text-[#7fb519]">
            02. Product Disclaimer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-[13px] uppercase tracking-wider">
                Imagery & Details
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We make every effort to ensure that product images and
                descriptions are as accurate as possible. However, minor
                differences may occur due to extra embellishments used during
                fashion shoots.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-[13px] uppercase tracking-wider">
                Color Variance
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Colors may vary slightly from the actual item due to lighting
                during photo shoots, your device’s display settings, or the
                printing quality of catalogs and inlay cards.
              </p>
            </div>
          </div>
          <div className="pt-4">
            <p className="text-center p-4 bg-[var(--color-primary-dark)] text-white text-xs tracking-[0.1em] uppercase">
              Customers are requested to review the product description before
              placing an order.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderCancellation;
