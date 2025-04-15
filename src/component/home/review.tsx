import React from 'react';
import Slider from 'react-slick';
import { ChatBubbleLeftRightIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Data testimoni
const testimonials = [
  {
    name: 'Amanda',
    text: 'Rotinya enak banget! Fresh dan lembut, anak-anak juga suka banget.',
    rating: 5,
  },
  {
    name: 'Budi',
    text: 'Pelayanannya cepat, dan roti datang masih hangat. Recommended!',
    rating: 4,
  },
  {
    name: 'Siti',
    text: 'Tiap minggu pasti beli, favorit keluarga kami!',
    rating: 5,
  },
];

// Custom Arrow Components
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
    >
      <ChevronRightIcon className="w-8 h-8 text-[#6F4E37] hover:text-[#A0522D]" />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
    >
      <ChevronLeftIcon className="w-8 h-8 text-[#6F4E37] hover:text-[#A0522D]" />
    </div>
  );
};

// Slick Slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const TestimonialCarousel = () => {
  return (
    <section className="bg-[#FFF8F1] py-20">
      <div className="max-w-3xl mx-auto px-4 text-center font-[Playfair_Display] relative">
        <h2 className="text-3xl font-bold text-[#6F4E37] mb-4">
          Apa Kata Mereka
        </h2>
        <p className="text-[#8B7E74] mb-12">
          Testimoni dari pelanggan setia kami.
        </p>

        <Slider {...settings} className="rounded-xl">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[#ffff] p-8 rounded-xl shadow text-center"
            >
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-[#D2691E] mx-auto mb-4" />
              <p className="text-[#5C4033] italic mb-4">“{item.text}”</p>
              <div className="flex justify-center items-center mb-2">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
                ))}
              </div>
              <p className="text-[#6F4E37] font-semibold">{item.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
