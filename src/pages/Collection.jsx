import { useState, useEffect, useCallback } from "react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import ProductSkeleton from "../components/ProductSkeleton";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ChevronDown, Search, FilterX, Sparkles } from "lucide-react";

const Collection = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();

  const [showSort, setShowSort] = useState(false);

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [search, setSearch] = useState("");

  /**
   * FETCH PRODUCTS
   */
  const fetchProducts = useCallback(
    async (pageNumber = 1, searchTerm = "") => {
      try {
        const res = await axios.get(
          `${backendURL}/api/product/allProducts?page=${pageNumber}&limit=10&search=${searchTerm}`,
        );

        if (pageNumber === 1) {
          setProducts(res.data.products);
        } else {
          setProducts((prev) => [...prev, ...res.data.products]);
        }

        setHasMore(res.data.hasMore);
      } catch (err) {
        console.error("Fetch Products Error:", err);
      } finally {
        setLoading(false);
      }
    },
    [backendURL],
  );

  /**
   * APPLY FILTERS
   */
  const applyFilter = useCallback(() => {
    let copy = [...products];

    // SEARCH FILTER
    if (search) {
      copy = copy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // CATEGORY FILTER
    if (category.length > 0) {
      copy = copy.filter((item) => category.includes(item.category));
    }

    // SUB CATEGORY FILTER
    if (subCategory.length > 0) {
      copy = copy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    // SORTING
    if (sortType === "low-high") {
      copy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      copy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(copy);
  }, [products, search, category, subCategory, sortType]);

  /**
   * INITIAL LOAD
   */
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const categoryFromUrl = searchParams.get("category");

    if (categoryFromUrl) {
      setCategory([categoryFromUrl]);
    }

    fetchProducts(1, "");
  }, [location.search, fetchProducts]);

  /**
   * SEARCH WITH DEBOUNCE
   */
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      fetchProducts(1, search);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, fetchProducts]);

  /**
   * APPLY FILTERS + SORT
   */
  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  return (
    <div className="page-transition flex flex-col sm:flex-row gap-12 pt-16 border-t border-gray-100 min-h-[100vh] bg-[var(--color-bg-page)] px-4 md:px-10 lg:px-20 font-light">
      {/* LEFT FILTER */}
      <div className="min-w-72 sm:sticky sm:top-24 h-fit">
        <div
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center justify-between cursor-pointer group pb-4 border-b border-[var(--color-primary-dark)]/10"
        >
          <p className="text-[11px] tracking-[0.4em] font-bold text-[var(--color-primary-dark)] uppercase flex items-center gap-2">
            <Sparkles
              size={14}
              className="text-[var(--color-accent-lime)]"
            />
            Filter Selection
          </p>

          <ChevronDown
            className={`h-4 text-gray-400 transition-transform duration-500 sm:hidden ${
              showFilter ? "rotate-180" : ""
            }`}
          />
        </div>

        <div
          className={`${
            showFilter
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0"
          } sm:max-h-none sm:opacity-100 transition-all duration-700 overflow-hidden`}
        >
          {/* CATEGORY SECTION */}
          <div className="mt-10 animate-in fade-in slide-in-from-left-4 duration-500">
            <p className="text-[10px] tracking-[0.2em] font-bold text-[#7fb519] uppercase mb-6 italic font-serif">
              Categories
            </p>

            <div className="flex flex-col gap-4">
              {[
                "Men",
                "Women",
                "Kids",
                "Luxury Formal",
                "Luxury Pret",
                "Couture & Wedding",
                "Fragrances",
                "Bags",
                "Jewelry",
                "Accessories",
              ].map((cat) => (
                <label
                  key={cat}
                  className="group flex items-center gap-3 text-[13px] text-gray-500 hover:text-[#00311F] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={category.includes(cat)}
                    className="peer h-3 w-3 appearance-none border border-gray-300 checked:bg-[var(--color-primary-dark)] checked:border-[var(--color-primary-dark)] transition-all"
                    onChange={() =>
                      setCategory((prev) =>
                        prev.includes(cat)
                          ? prev.filter((c) => c !== cat)
                          : [...prev, cat],
                      )
                    }
                  />

                  <span className="group-hover:translate-x-1 transition-transform duration-300 tracking-wide uppercase text-[11px]">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* SUB CATEGORY */}
          <div className="mt-12 pt-8 border-t border-gray-100 pb-20 animate-in fade-in slide-in-from-left-6 duration-700">
            <p className="text-[10px] tracking-[0.2em] font-bold text-[#7fb519] uppercase mb-6 italic font-serif">
              Product Type
            </p>

            <div className="flex flex-col gap-4">
              {[
                "Topwear",
                "Bottomwear",
                "Winterwear",
                "Footwear",
                "Outerwear",
                "Handcrafted",
                "Signature Scents",
                "Statement Pieces",
                "Seasonal",
              ].map((sub) => (
                <label
                  key={sub}
                  className="group flex items-center gap-3 text-[13px] text-gray-500 hover:text-[#00311F] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={subCategory.includes(sub)}
                    className="h-3 w-3 appearance-none border border-gray-300 checked:bg-[var(--color-primary-dark)] checked:border-[var(--color-primary-dark)] transition-all cursor-pointer"
                    onChange={() =>
                      setSubCategory((prev) =>
                        prev.includes(sub)
                          ? prev.filter((s) => s !== sub)
                          : [...prev, sub],
                      )
                    }
                  />

                  <span className="group-hover:translate-x-1 transition-transform duration-300 tracking-wide uppercase text-[11px]">
                    {sub}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-10 h-[1px] w-10 bg-gray-100"></div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div className="space-y-2">
            <Title text1="Maison" text2="Collections" />

            <p className="text-[11px] uppercase tracking-[0.5em] text-gray-400 font-light">
              Curating timeless elegance
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
            {/* SEARCH */}
            <div className="relative flex items-center w-full sm:w-64 group border-b border-gray-400 py-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-[12px] font-light outline-none placeholder:text-gray-600 tracking-wider"
                type="text"
                placeholder="Find a masterpiece..."
              />

              <Search
                className="text-gray-300 group-focus-within:text-[var(--color-primary-dark)] transition-colors"
                size={16}
              />
            </div>

            {/* SORT */}
            <div className="relative min-w-[200px]">
              <div
                onClick={() => setShowSort(!showSort)}
                className="flex items-center justify-between cursor-pointer border-b border-gray-200 py-3 group"
              >
                <p className="text-[11px] tracking-[0.2em] uppercase font-bold text-gray-500 group-hover:text-[var(--color-primary-dark)] transition-all">
                  Sort by:{" "}
                  <span className="text-black">
                    {sortType === "relevant"
                      ? "Relevant"
                      : sortType === "low-high"
                        ? "Low - High"
                        : "High - Low"}
                  </span>
                </p>

                <ChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform ${
                    showSort ? "rotate-180" : ""
                  }`}
                />
              </div>

              {showSort && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-2xl z-50 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                  {[
                    {
                      label: "Relevant",
                      value: "relevant",
                    },
                    {
                      label: "Price: Low - High",
                      value: "low-high",
                    },
                    {
                      label: "Price: High - Low",
                      value: "high-low",
                    },
                  ].map((item) => (
                    <div
                      key={item.value}
                      onClick={() => {
                        setSortType(item.value);
                        setShowSort(false);
                      }}
                      className="px-5 py-4 text-[10px] tracking-[0.15em] uppercase font-bold text-gray-500 hover:bg-gray-50 hover:text-[var(--color-primary-dark)] cursor-pointer border-b border-gray-50 last:border-none transition-colors"
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="min-h-[60vh]">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              : filterProducts.map((item) => (
                  <div
                    key={item._id}
                    className="animate-in fade-in zoom-in-95 duration-700"
                  >
                    <ProductItem
                      slug={item.slug}
                      image={item.images}
                      name={item.name}
                      price={item.price}
                    />
                  </div>
                ))}
          </div>

          {/* EMPTY STATE */}
          {!loading && filterProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-40 text-center">
              <div className="p-6 bg-white rounded-full shadow-sm mb-6 border border-gray-50">
                <FilterX className="text-gray-200" size={32} />
              </div>

              <p className="font-serif italic text-xl text-[var(--color-primary-dark)]">
                No pieces found
              </p>

              <p className="text-gray-400 text-xs tracking-widest uppercase mt-2">
                Adjust your filters to explore more
              </p>
            </div>
          )}
        </div>

        {/* LOAD MORE */}
        {hasMore && !loading && (
          <div className="text-center mt-24 pb-16">
            <button
              onClick={() => {
                const nextPage = page + 1;

                setPage(nextPage);

                fetchProducts(nextPage, search);
              }}
              className="group relative px-16 py-5 overflow-hidden rounded-none border border-[var(--color-primary-dark)] transition-all hover:border-[var(--color-accent-lime)]"
            >
              <span className="relative z-10 text-[11px] tracking-[0.4em] font-bold text-[var(--color-primary-dark)] group-hover:text-white uppercase transition-colors">
                Explore More
              </span>

              <div className="absolute inset-0 bg-[var(--color-primary-dark)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;