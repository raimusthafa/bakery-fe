import { EnvelopeIcon } from '@heroicons/react/24/solid';

const PromoBar = () => {
  return (
    <section className="bg-[#6F4E37] py-16 text-white">
      <div className="max-w-4xl mx-auto text-center px-4 font-[Playfair_Display]">
        <EnvelopeIcon className="w-10 h-10 mx-auto mb-4 text-[#FFDAB9]" />
        <h2 className="text-3xl font-bold mb-2 ">
          Dapatkan Promo Spesial & Roti Terbaru
        </h2>
        <p className="mb-6 text-[#FFEFD5]">
          Daftar untuk mendapatkan info promo, produk baru, dan kabar menarik dari kami!
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="submit"
            className="bg-[#FFDAB9] text-[#6F4E37] w-60 font-semibold px-6 py-3 rounded-full hover:bg-[#fcd3aa] transition"
          >
            Daftar
          </button>
        </form>
      </div>
    </section>
  );
};

export default PromoBar;
