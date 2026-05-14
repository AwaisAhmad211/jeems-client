import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { Star, Truck, RefreshCw, ShieldCheck } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

const Product = () => {
  const { slug } = useParams();
  const { currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState(""); // New state for color selection


  // fetchhing data from backend using slug and setting it to productData state
 useEffect(() => {
    const fetchProductDetails = async (slug) => {
      try {
        const response = await axiosInstance.get(
          `/api/product/single-product?slug=${slug}`,
        );
        if (response.data.success) {
          setProductData(response.data.product);
          setImage(response.data.product.images[0]); // Set the first image as default
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails(slug);
  }, [slug]);

  // useEffect(() => {
  //   fetchProductData();
  //   window.scrollTo(0, 0);
  // }, [slug, products]);

  return productData ? (
    <div className="pt-16 transition-opacity ease-in duration-700 opacity-100 bg-[var(--color-bg-page)] min-h-screen px-4 md:px-10 lg:px-20 page-transition">
      <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-700">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-accent-lime)] font-bold">
          {productData.category} — {productData.subCategory}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start gap-16">
        {/* LEFT SECTION: IMAGE GALLERY */}
        <div className="flex-1 flex flex-col-reverse md:flex-row gap-4 self-start">
          <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto md:w-24 gap-3 no-scrollbar">
            {productData.images.map((item, index) => (
              <div
                key={index}
                onClick={() => setImage(item)}
                className={`relative cursor-pointer aspect-[3/4] flex-shrink-0 transition-all duration-300 border-b-2 ${
                  image === item
                    ? "border-[var(--color-primary-dark)]"
                    : "border-transparent opacity-60"
                }`}
              >
                <img src={item} className="w-full h-full object-cover" alt="" />
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-hidden bg-white shadow-sm relative">
            <img
              src={image}
              className={`w-full h-auto object-cover transform transition-transform duration-1000 hover:scale-105 ${
                productData.stock <= 0 ? "grayscale" : ""
              }`}
              alt={productData.name}
            />

            {productData.stock <= 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                <span className="bg-white text-[var(--color-primary-dark)] px-6 py-2 text-[10px] tracking-[0.3em] font-bold uppercase shadow-xl">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SECTION: DETAILS */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="font-serif text-4xl text-[var(--color-primary-dark)] leading-tight mb-2 italic">
              {productData.name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-[var(--color-accent-lime)]">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
                <Star size={14} className="text-gray-300" />
              </div>
              <p className="text-[11px] tracking-widest text-gray-400 uppercase">
                (122 Reviews)
              </p>
            </div>
          </div>

          <p className="text-3xl font-light text-[var(--color-primary-dark)]">
            {currency}
            {productData.price.toLocaleString()}
          </p>

          <p className="text-gray-600 font-light leading-relaxed max-w-lg">
            {productData.description}
          </p>

          {/* COLOR SELECTOR */}
          {productData.colors && productData.colors.length > 0 && (
            <div className="space-y-4">
              <p className="text-[11px] tracking-[0.2em] font-bold uppercase text-[#00311F]">
                Select Color:{" "}
                <span className="text-gray-400 font-normal ml-2">{color}</span>
              </p>
              <div className="flex gap-3">
                {productData.colors.map((item, index) => (
                  <div
                    key={index}
                    // Only allow clicking if stock is > 0
                    onClick={() => productData.stock > 0 && setColor(item.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      productData.stock > 0
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-20 grayscale" // Visual feedback for no stock
                    } ${
                      color === item.name
                        ? "border-[var(--color-primary-dark)] scale-110"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: item.code }}
                    title={
                      productData.stock > 0
                        ? item.name
                        : `${item.name} (Out of Stock)`
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* SIZE SELECTOR */}
          <div className="space-y-4">
            <div className="flex justify-between items-center max-w-xs">
              <p className="text-[11px] tracking-[0.2em] font-bold uppercase text-[#00311F]">
                Select Size
              </p>
            </div>
            <div className="flex gap-3">
              {productData.sizes.map((item, index) => (
                <button
                  disabled={productData.stock <= 0} // Add this
                  onClick={() => setSize(item)}
                  key={index}
                  className={`w-12 h-12 flex items-center justify-center text-xs tracking-widest transition-all duration-300 border ${
                    productData.stock <= 0
                      ? "opacity-30 cursor-not-allowed"
                      : "" // Add this
                  } ${
                    item === size
                      ? "bg-[var(--color-primary-dark)] text-white border-[var(--color-primary-dark)]"
                      : "bg-white text-gray-400 border-gray-100 hover:border-[var(--color-accent-lime)]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* ACTION BUTTON */}
          <div className="space-y-2">
            <button
              disabled={productData.stock <= 0}
              onClick={() => addToCart(productData._id, size, color)}
              className={`group relative w-full lg:max-w-md py-5 overflow-hidden border transition-all duration-500 ${
                productData.stock > 0
                  ? "border-[var(--color-primary-dark)] cursor-pointer"
                  : "border-gray-200 cursor-not-allowed opacity-50"
              }`}
            >
              <span
                className={`relative z-10 text-[11px] tracking-[0.4em] font-bold uppercase transition-colors ${
                  productData.stock > 0
                    ? "text-[#00311F] group-hover:text-white"
                    : "text-gray-400"
                }`}
              >
                {productData.stock > 0 ? "Add to Collection" : "Sold Out"}
              </span>

              {productData.stock > 0 && (
                <div className="absolute inset-0 bg-[#00311F] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              )}
            </button>

            {/* STOCK WARNING TEXT */}
            {productData.stock <= 0 && (
              <p className="text-red-500 text-[10px] tracking-widest uppercase font-bold">
                This item is currently unavailable
              </p>
            )}
            {productData.stock > 0 && productData.stock < 5 && (
              <p className="text-orange-500 text-[10px] tracking-widest uppercase font-bold animate-pulse">
                Only {productData.stock}{" "}
                {productData.stock === 1 ? "item" : "items"} left!
              </p>
            )}
          </div>
          {/* Quality Promises */}
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-100">
            <div className="flex flex-col items-center sm:items-start gap-2">
              <ShieldCheck size={18} className="text-[#7fb519]" />
              <p className="text-[10px] tracking-widest uppercase text-[#00311F] font-bold">
                100% Authentic
              </p>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <Truck size={18} className="text-[#7fb519]" />
              <p className="text-[10px] tracking-widest uppercase text-[#00311F] font-bold">
                Priority Shipping
              </p>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <RefreshCw size={18} className="text-[#7fb519]" />
              <p className="text-[10px] tracking-widest uppercase text-[#00311F] font-bold">
                7-Day Return
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-20 border-t border-gray-100 pt-20 pb-20">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFBF7]">
      <div className="w-10 h-10 border-4 border-gray-100 border-t-[#00311F] rounded-full animate-spin"></div>
    </div>
  );
};

export default Product;
