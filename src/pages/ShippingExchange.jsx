const ShippingExchange = () => {
  return (
    <div className="bg-white text-[var(--color-primary-dark)] px-6 py-20 sm:px-16 max-w-[1000px] mx-auto font-light leading-relaxed">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl tracking-[0.2em] uppercase font-bold mb-4">
          Shipping & Exchange
        </h1>
        <div className="h-[2px] w-20 bg-[var(--color-accent-lime)] mx-auto"></div>
      </div>

      <div className="space-y-12 text-sm md:text-base tracking-wide">
        {/* Section 1: General Policy */}
        <section>
          <p className="border-l-4 border-[var(--color-accent-lime)] pl-4 italic text-gray-600">
            Mahnoor Sahi does not offer any ‘Refund’ or ‘Return’ for any
            products. All sales are considered final.
          </p>
        </section>

        {/* Section 2: Exchange Criteria */}
        <section className="space-y-6">
          <h2 className="text-[12px] tracking-[0.4em] font-bold uppercase text-[var(--color-accent-lime)]">
            01. Exchange Policy
          </h2>
          <p>
            Products purchased from our Site can be exchanged within{" "}
            <strong>07 days</strong> only if:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "The item is faulty, damaged, or defective at delivery.",
              "The received product differs from the original order.",
              "Items are missing from the package (tags, labels, packing).",
              "Request is made within the stated 7-day timeframe.",
            ].map((item, index) => (
              <li
                key={index}
                className="flex gap-3 items-start bg-gray-50 p-4 rounded-sm"
              >
                <span className="text-[var(--color-accent-lime)] font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3: Dispute Resolution */}
        <section className="bg-[var(--color-primary-dark)] text-white p-8 rounded-sm">
          <h2 className="text-[12px] tracking-[0.4em] font-bold uppercase text-[var(--color-accent-lime)] mb-4">
            02. How to Raise a Dispute
          </h2>
          <p className="mb-6 opacity-90">
            Claims must be made within 07 days of the original delivery date.
            Please provide photographic evidence.
          </p>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <span className="block text-[10px] uppercase tracking-widest text-gray-400">
                Email us
              </span>
              <a
                href="mailto:info.mahnoorsahi@gmail.com"
                className="text-[var(--color-accent-lime)] hover:underline"
              >
                info.mahnoorsahi@gmail.com
              </a>
            </div>
            <div className="flex-1">
              <span className="block text-[10px] uppercase tracking-widest text-gray-400">
                WhatsApp / Call
              </span>
              <p className="">+92 319 436 1715</p>
            </div>
          </div>
        </section>

        {/* Section 4: Critical Terms */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
          <div className="space-y-4">
            <h3 className="font-bold uppercase text-[11px] tracking-widest">
              General Terms
            </h3>
            <ul className="list-disc ml-4 space-y-2 text-gray-500">
              <li>
                Customers are responsible for all shipping and handling costs
                for exchanges.
              </li>
              <li>
                Once a dispute is settled, a replacement of the same value will
                be issued.
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold uppercase text-[11px] tracking-widest">
              Non-Exchangable Items
            </h3>
            <ul className="list-disc ml-4 space-y-2 text-red-800">
              <li>Discounted/Sale items cannot be returned or exchanged.</li>
              <li>Unstitched articles once stitched.</li>
              <li>
                <strong>Wedding Wear and Couture</strong> cannot be exchanged or
                returned under any circumstances.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShippingExchange;
