import { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import axios from "axios";
import ProductSkeleton from "./ProductSkeleton";

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [loading, setLoading] = useState(true);

  const getLastestProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/product/bestSellers`);
      setBestSeller(response.data.products);
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
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          The signature piece everyone is talking about—a true Mahnoor Sahi
          favorite.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : bestSeller.map((item, index) => (
              <ProductItem
                key={index}
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

export default BestSeller;
