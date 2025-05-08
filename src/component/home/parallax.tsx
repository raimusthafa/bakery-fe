import React from "react";

const ParallaxHero = () => {
  return (
    <div className="w-full">
      {/* Parallax Section */}
      <div
        className="h-screen bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/roti-segar.jpg')", // Ganti dengan path gambar kamu
        }}
      >
        <div className="text-center bg-black/40 text-white px-6 py-10 rounded-xl backdrop-blur-sm">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Lezat, Lembut & Fresh Setiap Hari
          </h1>
          <p className="text-xl font-semibold">
            Bakery <span className="underline decoration-yellow-400">Pilihan Anda!</span>
          </p>
        </div>
      </div>

      {/* Konten setelah parallax */}
      <section className="py-16 px-6 md:px-20 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Selamat Datang di Toko Roti Kami</h2>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
          Kami menyediakan roti berkualitas tinggi, dibuat dengan bahan alami dan tanpa pengawet.
          Segar setiap hari langsung dari oven kami ke tangan Anda!
        </p>
      </section>
    </div>
  );
};

export default ParallaxHero;
