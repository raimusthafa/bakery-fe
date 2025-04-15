import React from 'react';
import {
    SparklesIcon,
    HeartIcon,
    TruckIcon,
  } from '@heroicons/react/24/outline';

const benefits = [
  {
    icon: <SparklesIcon className="w-8 h-8 text-[#D2691E]" />,
    title: 'Bahan Alami',
    desc: 'Kami hanya menggunakan bahan segar dan alami tanpa pengawet.',
  },
  {
    icon: <HeartIcon className="w-8 h-8 text-[#D2691E]" />,
    title: 'Dibuat dengan Cinta',
    desc: 'Setiap roti dibuat secara handmade oleh baker profesional kami.',
  },
  {
    icon: <TruckIcon className="w-8 h-8 text-[#D2691E]" />,
    title: 'Pengiriman Cepat',
    desc: 'Pesanan dikirim hangat langsung ke pintu Anda dalam waktu singkat.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="pt-16 pb-10 bg-[#FFF8F1]">
      <div className="max-w-6xl mx-auto px-4 text-center font-[Playfair_Display]">
        <h2 className="text-4xl font-bold text-[#6F4E37] mb-4">Kenapa Pilih Kami?</h2>
        <p className="text-[#8B7E74] mb-12 text-xl">
          Komitmen kami untuk kualitas dan pelayanan terbaik.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {benefits.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition duration-300">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#5C4033] mb-2">{item.title}</h3>
              <p className="text-[#8B7E74] text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
