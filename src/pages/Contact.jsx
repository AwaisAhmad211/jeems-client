import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
import { assets } from "../assets/assets";
import { MapPin, Phone, Mail, Globe, ArrowUpRight } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-[var(--color-bg-page)] animate-in fade-in duration-700 page-transition">
      {/* Header Section */}
      <div className="text-center text-3xl pt-24 pb-10 border-t border-gray-100">
        <Title text1={"GET IN"} text2={"TOUCH"} />
        <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mt-4">
          We are here to assist your bespoke journey
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-16 mb-28 px-4 md:px-20">
        {/* Image with Luxury Border Effect */}
        <div className="relative group">
          <div className="absolute inset-0 border border-[var(--color-accent-lime)]/30 rounded-2xl translate-x-3 translate-y-3 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
          <img
            className="w-full md:max-w-[480px] rounded-2xl shadow-xl transition-all duration-500 group-hover:grayscale-[0.5]"
            src={assets.contact_img}
            alt="Mahnoor Sahi Atelier"
          />
        </div>

        {/* Contact Details Section */}
        <div className="flex flex-col justify-center items-start gap-10 md:w-1/3">
          {/* Atelier Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[var(--color-accent-lime)]" />
              <h2 className="font-serif text-2xl text-[var(--color-primary-dark)] italic">
                The Flagship Atelier
              </h2>
            </div>
            <p className="text-gray-500 font-light leading-relaxed">
              Phalia Road, Mandi Bahauddin, Punjab, Pakistan
            </p>
          </div>

          {/* Contact Methods */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="p-3 bg-white rounded-full shadow-sm group-hover:bg-[#00311F] group-hover:text-white transition-all">
                <Phone size={16} />
              </div>
              <p className="text-gray-500 text-sm">+92 319 436 1715</p>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="p-3 bg-white rounded-full shadow-sm group-hover:bg-[#00311F] group-hover:text-white transition-all">
                <Mail size={16} />
              </div>
              <p className="text-gray-500 text-sm">
                help.mahnoorsahi@gmail.com
              </p>
            </div>
          </div>

          <hr className="w-full border-gray-100" />

          {/* Careers Section */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-[var(--color-primary-dark)] italic flex items-center gap-2">
              Join The House
            </h2>
            <p className="text-gray-500 text-sm font-light">
              We are always looking for visionary designers and master artisans
              to join our growing team.
            </p>
            <button className="group flex items-center gap-2 bg-[var(--color-primary-dark)] text-white px-8 py-4 text-xs tracking-widest uppercase hover:bg-[var(--color-accent-lime)] transition-all duration-500 rounded-full shadow-lg shadow-[var(--color-primary-dark)]/10">
              Join Us
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Global Presence Mini-Section */}
      <div className="bg-[var(--color-bg-cream-light)] py-16 mb-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <Globe className="mx-auto text-[var(--color-accent-lime)] mb-6 opacity-50" size={40} />
          <h3 className="text-xl font-serif text-[var(--color-primary-dark)] mb-4">
            All Pakistan Shipping
          </h3>
          <p className="text-gray-500 text-sm font-light italic">
            &quot;Bringing the essence of Pakistani luxury to doorsteps&quot;
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
