import { useNavigate } from "react-router-dom";

const ShopByCategory = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      title: "Jewelry",
      category: "Jewelry",
      image:
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop",
      gridClass: "md:col-span-1 md:row-span-2", // Full height left
    },
    {
      id: 2,
      title: "Handbags",
      category: "Bags",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
      gridClass: "md:col-span-1 md:row-span-1", // Top right
    },
    {
      id: 3,
      title: "Women's Wear",
      category: "Women",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
      gridClass: "md:col-span-1 md:row-span-1", // Bottom middle
    },
    {
      id: 4,
      title: "Men's Collection",
      category: "Men",
      image:
        "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80&w=800",
      gridClass: "md:col-span-1 md:row-span-1", // Bottom right
    },
  ];

  return (
    <section className="w-full mx-auto px-4 py-12">
      {/* Container with a fixed height on desktop to force alignment */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[700px]">
        {/* 1. LARGE VERTICAL CARD (Left) */}
        <CategoryCard
          item={categories[0]}
          onClick={() =>
            navigate(`/collection?category=${categories[0].category}`)
          }
        />

        {/* 2. TEXT CONTENT BLOCK (Middle Top) */}
        <div className="md:col-span-1 md:row-span-1 flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
          <div className="flex flex-col items-center cursor-default group">
            <h1
              className="text-2xl lg:text-3xl font-serif uppercase text-[var(--color-primary-dark)] relative overflow-hidden"
              style={{ animation: "breathing 5s ease-in-out infinite" }}
            >
              <span className="relative z-10">Mahnoor Sahi</span>
              <div
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                style={{ animation: "shimmer 3s infinite" }}
              />
            </h1>
            <div className="w-8 h-[1px] bg-[var(--color-accent-lime)] mt-2 animate-pulse transition-all duration-700 group-hover:w-20"></div>
          </div>
          <h2 className="text-xl font-serif text-gray-800 mt-4 mb-2">
            Shop by Category
          </h2>
          <p className="text-xs text-gray-600 mb-4 max-w-[200px]">
            Curated collections to elevate your lifestyle.
          </p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-[var(--color-accent-lime)] hover:bg-[var(--color-accent-hover)] text-white px-6 py-2 rounded-full text-xs transition-all duration-300 font-medium"
          >
            Explore Now
          </button>
          <style>{`
              @keyframes breathing { 0%, 100% { letter-spacing: 0.1em; opacity: 0.9; } 50% { letter-spacing: 0.2em; opacity: 1; } }
              @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
            `}</style>
        </div>

        {/* 3. TOP RIGHT CARD */}
        <CategoryCard
          item={categories[1]}
          onClick={() =>
            navigate(`/collection?category=${categories[1].category}`)
          }
        />

        {/* 4. BOTTOM MIDDLE CARD */}
        <CategoryCard
          item={categories[2]}
          onClick={() =>
            navigate(`/collection?category=${categories[2].category}`)
          }
        />

        {/* 5. BOTTOM RIGHT CARD */}
        <CategoryCard
          item={categories[3]}
          onClick={() =>
            navigate(`/collection?category=${categories[3].category}`)
          }
        />
      </div>
    </section>
  );
};

const CategoryCard = ({ item, onClick }) => (
  <div
    onClick={onClick}
    className={`relative group overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer ${item.gridClass}`}
  >
    <img
      src={item.image}
      alt={item.title}
      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
    />
    {/* Label Overlay */}
    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-4 flex justify-center">
      <button className="bg-white/90 backdrop-blur-sm w-3/4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-gray-700 shadow-sm group-hover:bg-[var(--color-accent-lime)] group-hover:text-white transition-all duration-300">
        {item.title}
      </button>
    </div>
  </div>
);

export default ShopByCategory;
