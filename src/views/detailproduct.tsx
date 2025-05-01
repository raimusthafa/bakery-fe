import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { ProductDetail } from "../api/products";
import { fetchPublicPostDetail } from "../api/products";

const LoadingCard = () => (
  <section className="min-h-screen bg-[#FDF6ED] py-10 px-4">
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden animate-pulse">
      <div className="flex flex-col md:flex-row">
        {/* Gambar Produk */}
        <div className="md:w-1/2 bg-gray-300 h-96 md:rounded-l-2xl"></div>

        {/* Detail Produk */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-24 bg-gray-300 rounded mb-6"></div>
            {/* <div className="h-6 bg-yellow-200 rounded w-[15%]"></div> */}
          </div>

          <div className="mt-4">
            <div className="h-10 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProductDetail = () => {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError("ID produk tidak ditemukan.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetchPublicPostDetail(id);
        setProduct(response);
        setError(null);
      } catch (error) {
        console.error("Gagal memuat detail produk:", error);
        setError("Gagal memuat detail produk.");
      } finally {
        // setTimeout(() => {
        //   setLoading(false);  // Setelah 3 detik, set loading ke false
        // }, 10000); // 3000 ms = 3 detik
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <LoadingCard />;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-lg text-red-600">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10 text-lg text-gray-600">
        Produk tidak ditemukan.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FDF6ED] py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Gambar Produk */}
          <div className="md:w-1/2">
            <img
              src={product.image || "/default-image.jpg"}
              alt={product.title}
              className="w-full h-96 object-cover md:rounded-l-2xl"
            />
          </div>

          {/* Detail Produk */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#6F4E37] mb-4">{product.title}</h1>
              <p className="text-xl text-[#6F4E37] font-semibold mb-2">
                Rp {parseInt(product.price).toLocaleString("id-ID")}
              </p>
              <p className="text-[#8B7E74] mb-6 leading-relaxed whitespace-pre-line">{product.content}</p>

              {product.is_preorder && (
                <div className="bg-yellow-100 text-yellow-800 flex justify-center text-sm px-4 py-2 rounded-lg w-[15%]">
                <span>Preorder</span>
              </div>
              )}
            </div>

            <div className="mt-4">
              <Link
                to="/products"
                className="inline-block bg-[#D9822B] hover:bg-[#B88C65] text-white px-6 py-2 rounded-xl transition"
              >
                Kembali ke Produk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
