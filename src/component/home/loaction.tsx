import { MapPinIcon, ClockIcon, PhoneIcon } from '@heroicons/react/24/outline';

const LocationSection = () => {
  return (
    <section className="bg-[#FFF8F1] py-20 px-4" id="location">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Text Content */}
        <div className="space-y-6 font-[Playfair_Display]">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6F4E37] ">
            Lokasi Toko Kami
          </h2>
          <p className="text-[#5C4033] leading-relaxed">
            Kami menantikan kedatangan Anda! Toko kami mudah diakses dan berada
            di lokasi strategis. Jangan ragu untuk datang dan nikmati aroma roti
            yang baru dipanggang setiap harinya.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPinIcon className="w-6 h-6 text-[#D2691E]" />
              <span className="text-[#5C4033]">Jl. Roti Hangat No. 123, Jakarta</span>
            </div>
            <div className="flex items-center gap-3">
              <ClockIcon className="w-6 h-6 text-[#D2691E]" />
              <span className="text-[#5C4033]">Senin - Minggu: 08.00 - 20.00 WIB</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="w-6 h-6 text-[#D2691E]" />
              <span className="text-[#5C4033]">+62 812-3456-7890</span>
            </div>
          </div>
        </div>

        {/* Right Side: Google Maps */}
        <div className="rounded-xl overflow-hidden shadow-lg">
        <iframe
          title="Lokasi Bakery"
          src="https://www.google.com/maps?q=-3.439869,114.833718&z=17&output=embed"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
