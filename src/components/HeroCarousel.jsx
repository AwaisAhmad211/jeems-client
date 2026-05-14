import { useState, useEffect, useCallback, useContext } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"; // Install lucide-react for icons
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

// const slides = [
//   {
//     id: 1,
//     title: "Couture Collection",
//     subtitle: "Handcrafted Elegance",
//     description:
//       "Experience the pinnacle of luxury with our custom-tailored wedding and formal wear.",
//     image:
//       "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?q=80&w=2000&auto=format&fit=crop",
//     cta: "Explore Couture",
//     category: "Couture & Wedding",
//     color: "text-white",
//   },
//   {
//     id: 2,
//     title: "Timeless Jewelry",
//     subtitle: "Pure Brilliance",
//     description:
//       "Discover pieces designed to be passed down through generations.",
//     image:
//       "https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?q=80&w=2000&auto=format&fit=crop",
//     cta: "Shop Jewelry",
//     category: "Jewelry",

//     color: "text-white",
//   },
//   {
//     id: 3,
//     title: "Luxury Pret",
//     subtitle: "Modern Sophistication",
//     description:
//       "High-end ready-to-wear designs inspired by global runway trends.",
//     image:
//       "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop",
//     cta: "View Collection",
//     category: "Luxury Pret",
//     color: "text-white",
//   },
// ];

const HeroCarousel = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const { backendUrl } = useContext(ShopContext);

  // Fetch slides from API
  const fetchSlides = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/slide/list`);
      if (response.data.success) {
        setSlides(response.data.slides);
      }
    } catch (error) {
      console.error("Error fetching slides", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const nextSlide = useCallback(() => {
    if (slides.length > 0) {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }
  }, [slides.length]);

  const prevSlide = () => {
    if (slides.length > 0) {
      setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(nextSlide, 6000);
      return () => clearInterval(timer);
    }
  }, [nextSlide, slides.length]);

  if (loading)
    return (
      <div className="h-[62vh] flex items-center justify-center bg-gray-100 rounded-2xl">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (slides.length === 0) return null;

  return (
    <div className="relative h-[62vh] top-4 w-full overflow-hidden bg-black rounded-2xl">
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className={`h-full w-full object-cover transition-transform duration-[7000ms] ease-linear ${
                index === current ? "scale-110" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
          </div>

          {/* Dynamic Content */}
          <div className="relative h-full flex items-center px-6 md:px-20 lg:px-32">
            <div
              className={`max-w-2xl text-white space-y-6 transform transition-all duration-1000 delay-300 ${
                index === current
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <span className="uppercase tracking-[0.4em] text-sm font-medium text-[var(--color-accent-lime)]">
                {slide.subtitle}
              </span>
              <h1 className="text-5xl md:text-7xl font-serif leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl font-light opacity-90 max-w-lg">
                {slide.description}
              </p>
              <div className="pt-4">
                <button
                  onClick={() =>
                    navigate(`/collection?category=${slide.category}`)
                  }
                  className="bg-[var(--color-accent-lime)] hover:bg-[var(--color-accent-hover)] text-white px-10 py-4 rounded-full font-semibold shadow-xl transition-all hover:scale-105"
                >
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Navigation Buttons */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-4">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              i === current ? "w-10 bg-[var(--color-accent-lime)]" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
