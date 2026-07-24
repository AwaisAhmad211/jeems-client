import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  Instagram,
  MapPin,
  Mail,
  Phone,
  Facebook,
  Music2, // Using Music2 as a placeholder for TikTok if your lucide version is older
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[var(--color-footer-bg)] text-white pt-20 mt-20 pb-10 px-6 sm:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:grid grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 pb-16">
          {/* Brand Identity */}
          <div className="space-y-6">
            <img
              src={assets.ms_white_logo}
              className="w-40 lg:w-48"
              alt="Mahnoor Sahi"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-light">
              Elevating the essence of traditional craftsmanship with
              contemporary silhouettes. The House of Mahnoor Sahi stands for
              timeless elegance and bespoke luxury.
            </p>

            {/* Social Icons */}
            <div className="flex gap-5 pt-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/_mahnoor_saahi_?igsh=MW1iMnN6bXRoeG5yeg=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram
                  size={18}
                  className="text-gray-400 hover:text-[var(--color-footer-text-accent)] cursor-pointer transition-colors"
                />
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook
                  size={18}
                  className="text-gray-400 hover:text-[var(--color-footer-text-accent)] cursor-pointer transition-colors"
                />
              </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@mahnoorsaahi?_r=1&_t=ZS-94FLy8ugcS2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Music2
                size={18}
                className="text-gray-400 hover:text-[var(--color-footer-text-accent)] cursor-pointer transition-colors"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-[10px] tracking-[0.4em] font-bold uppercase text-[var(--color-footer-text-accent)]">
              The House
            </h4>
            <ul className="flex flex-col gap-4 text-xs tracking-widest text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                <Link to="/collection">Collection</Link>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                <Link to="/about">About Us</Link>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-[10px] tracking-[0.4em] font-bold uppercase text-[var(--color-footer-text-accent)]">
              Assistance
            </h4>
            <ul className="flex flex-col gap-4 text-xs tracking-widest text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">
                <Link to="/shipping-exchange">Shipping & Exchange</Link>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                <Link to="/order-cancellation">Order Cancellation</Link>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-[10px] tracking-[0.4em] font-bold uppercase text-[var(--color-footer-text-accent)]">
              Concierge
            </h4>
            <div className="flex flex-col gap-4 text-xs tracking-widest text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[var(--color-footer-text-accent)] shrink-0" />
                <span>Phalia Road, Mandi Bahauddin, Punjab, Pakistan</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-[var(--color-footer-text-accent)] shrink-0" />
                <span>+92 319 436 1715</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[var(--color-footer-text-accent)] shrink-0" />
                <span>info.mahnoorsahi@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
                {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500">
            © 2026 MAHNOOR SAHI. Crafted for Elegance.
          </p>

          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500">
            Developed by{" "}
            <a
              href="https://openstacked.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-footer-text-accent)] hover:text-white transition-colors"
            >
              OpenStacked
            </a>
          </p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
