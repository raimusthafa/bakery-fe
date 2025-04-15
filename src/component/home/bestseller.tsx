import React from 'react';
import { Link } from 'react-router';

const bestSellers = [
  {
    name: 'Chocolate Croissant',
    image: 'https://insanelygoodrecipes.com/wp-content/uploads/2024/12/Chocolate-Almond-Croissants-Recipe-500x500.jpg',
    price: 'Rp 20.000',
  },
  {
    name: 'Strawberry Tart',
    image: 'https://www.freee-foods.co.uk/wp-content/uploads/sites/2/2021/05/FR252_Strawberry-Tart-1080-1.jpg',
    price: 'Rp 25.000',
  },
  {
    name: 'Aqua Blue Macarons',
    image: 'https://cdn.shopify.com/s/files/1/1921/3233/articles/SUNCORE_FOODS_AQUA_BLUE_SPIRULINA_PASSION_FRUIT_MACARONS.jpg?v=1702154924',
    price: 'Rp 18.000',
  },
  {
    name: 'Cream Cheese Bun',
    image: 'https://i.cbc.ca/1.7356643.1729282727!/fileImage/httpImage/korean-garlic-cream-cheese-buns.jpg',
    price: 'Rp 15.000',
  },
];

const BestSeller = () => {
  return (
    <section className="pt-16 pb-10 bg-[#FDF9F5]">
      <div className="max-w-6xl mx-auto px-4 text-center font-[Playfair_Display]">
        <h2 className="text-4xl font-bold text-[#6F4E37] mb-4">Best Seller</h2>
        <p className="text-[#8B7E74] mb-12 text-xl">Favorit pelanggan kami, dibuat dengan cinta setiap hari.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {bestSellers.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#5C4033]">{item.name}</h3>
                <p className="text-[#8B7E74] mt-1">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
        <Link to="/products" className="px-6 py-2 bg-[#D2691E] hover:bg-[#b55618] text-white rounded-md shadow">
          Lihat Semua Produk
        </Link>
      </div>
      </div>
    </section>
  );
};

export default BestSeller;