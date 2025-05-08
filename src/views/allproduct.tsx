import { useEffect, useState } from "react";
import { fetchPublicPosts, Product } from "../api/products";
import { Link } from "react-router-dom";

const LoadingCard = () => (
  <div className="bg-white rounded-2xl shadow-md animate-pulse">
    <div className="w-full h-48 bg-gray-300 rounded-t-2xl"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

const Allproducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchPublicPosts(1, 12);
        // console.log("API Response:", response);

        const items = Array.isArray(response?.data?.data)
          ? response.data.data
          : Array.isArray(response?.data)
          ? response.data
          : response;

        if (Array.isArray(items)) {
          setProducts(items);
        } else {
          console.error("Data produk bukan array:", items);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <section className="pt-6 pb-10 bg-[#FDF9F5]">
      <div className="max-w-6xl mx-auto px-4 text-center font-[Playfair_Display]">
        <h2 className="text-3xl font-bold text-[#6F4E37] mb-4">Produk Kami</h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            {[...Array(8)].map((_, i) => (  // Menampilkan 2 baris dengan 4 card
              <LoadingCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            {products.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id}>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-2xl"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#5C4033] line-clamp-1">{item.title}</h3>
                    <p className="text-[#8B7E74] mt-1">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Allproducts;
