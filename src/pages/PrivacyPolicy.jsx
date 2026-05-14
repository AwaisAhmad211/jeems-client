const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-[var(--color-primary-dark)] px-6 py-20 sm:px-16 max-w-[1000px] mx-auto font-light leading-relaxed">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl tracking-[0.2em] uppercase font-bold mb-4">
          Privacy Policy
        </h1>
        <div className="h-[2px] w-20 bg-[#7fb519] mx-auto"></div>
      </div>

      <div className="space-y-12 text-sm md:text-base tracking-wide text-gray-700">
        <section className="bg-gray-50 p-6 border-l-4 border-[#7fb519]">
          <p>
            Each time that you use this website, you will be bound by the
            current <strong>Privacy Policy</strong> applicable at that
            particular moment. You must review this text regularly to confirm
            that you are in agreement with it.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-[12px] tracking-[0.4em] font-bold uppercase text-[#7fb519]">
            01. Data Handling Objectives
          </h2>
          <p>
            The personal data provided to{" "}
            <strong className="text-[#00311F] font-bold">Mahnoor Sahi</strong>{" "}
            will be processed for the following objectives:
          </p>
          <ul className="list-disc ml-5 space-y-3">
            <li>
              To develop, fulfill, and execute the sales contract for products
              you have acquired.
            </li>
            <li>To tend to your specific requests and inquiries.</li>
            <li>
              To provide information regarding{" "}
              <strong className="text-[var(--color-primary-dark)] font-bold">Mahnoor Sahi</strong>{" "}
              products (including made-to-measure, ready-to-wear, and luxury
              accessories).
            </li>
          </ul>
        </section>

        <section className="space-y-4 bg-[var(--color-primary-dark)] text-white p-8 rounded-sm">
          <h2 className="text-[12px] tracking-[0.4em] font-bold uppercase text-[#7fb519]">
            02. SMS & Mobile Communication
          </h2>
          <p className="opacity-90">
            Marketing communications may be sent via email or equivalent
            electronic means, such as **SMS text messages**.
          </p>
          <div className="bg-white/10 p-4 rounded mt-4 text-sm border border-white/20">
            <p className="font-bold mb-2 text-[var(--color-accent-lime)]">
              Carrier Compliance & Privacy:
            </p>
            <p className="mb-2">
              “We do not share your personal information with anyone except to
              comply with the law or protect our rights.”
            </p>
            <p className="text-[var(--color-accent-lime)]">
              * Mobile information will not be shared with third parties or
              affiliates for marketing or promotional purposes. This excludes
              text messaging originator opt-in data and consent; this
              information will not be shared with any third parties.
            </p>
          </div>
          <p className="text-xs pt-2">
            You may change your preferences or opt-out at any time in the &quot;Your
            Account&quot; section or by replying <strong>STOP</strong> to any
            message.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-[12px] tracking-[0.4em] font-bold uppercase text-[#7fb519]">
            03. Confidentiality & Rights
          </h2>
          <p>
            <strong className="text-[var(--color-primary-dark)] font-bold">Mahnoor Sahi</strong>,
            as the data holder, is committed to ensuring the confidentiality of
            your personal information. We guarantee your rights to access,
            rectification, cancellation, and objection.
          </p>
          <p>
            In order to comply with our objectives, we may convey provided
            information to our legal counsel; by registering on this website,
            you expressly authorize such conveyance.
          </p>
        </section>

        <section className="space-y-4 pt-6 border-t border-gray-100">
          <h2 className="text-[12px] tracking-[0.4em] font-bold uppercase text-[#7fb519]">
            04. Cookies Policy
          </h2>
          <p>
            We use cookies to improve your navigation experience. These are
            small text files stored on your device. By accepting this privacy
            policy, you consent to the use of cookies as described in our
            detailed
            <span className="text-[var(--color-accent-lime)] cursor-pointer hover:underline mx-1">
              Cookie Information page
            </span>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
