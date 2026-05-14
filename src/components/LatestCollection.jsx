import { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import ProductSkeleton from "./ProductSkeleton";
import axios from "axios";

const LatestCollection = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLastestProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendUrl}/api/product/latestCollections`,
      );
      setLatestProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching latest products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLastestProducts();
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Unveil your aura with our latest collection, crafted for those who
          embrace sophistication.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : latestProducts.map((item) => (
              <ProductItem
                key={item._id}
                slug={item.slug}
                image={item.images}
                name={item.name}
                price={item.price}
              />
            ))}
      </div>
    </div>
  );
};

export default LatestCollection;
