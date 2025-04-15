import { FC, useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import DrawCircleText from "../component/drawtext";
import BestSeller from "../component/home/bestseller";
import WhyChooseUs from "../component/home/service";
import TestimonialCarousel from "../component/home/review";
import PromoBar from "../component/home/newsletter";
import LocationSection from "../component/home/loaction";
import Footer from "../component/home/footer";

export const Home: FC = () => {
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && !user) {
      setLoading(true);
      fetchUser().finally(() => setLoading(false));
    }
  }, [token, user, fetchUser]);

  return (
    <div className="bg-[#FFF8F1]">
      <div className="container">
        {/* Gambar Latar Belakang */}
        <div className="relative h-screen">
          <img
            src="https://jnewsonline.com/wp-content/uploads/2023/10/bakery-di-jakarta.jpg"  // Ganti dengan path gambar yang sesuai
            alt="Background"
            className="w-full h-screen object-cover"
          />
          {/* Text overlay with modern styling */}
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 backdrop-blur-none transition-all duration-300">
            <div className="text-center p-8 max-w-4xl">
              <div className="animate-fade-in delay-200">
                <DrawCircleText />
              </div>
              {!user && (
                <div className="mt-8 animate-fade-in delay-300">
                  {/* <button className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full transition-all transform hover:scale-105">
                    Explore Our Menu
                  </button> */}
                </div>
              )}
            </div>
          </div>
        </div>

        {token && (
  <>
    {loading && (
      <p className="text-center text-gray-500">Memuat data pengguna...</p>
    )}

    {user && (
      <div className="flex justify-center">
        <div className="p-5 mt-5 mb-4 bg-gray-100 rounded-2xl shadow-lg">
          <div className="py-5 text-center">
            <h1 className="text-4xl font-bold">Halo, {user.name}!</h1>
            <p className="text-lg max-w-2xl mx-auto">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    )}
  </>
)} 
      </div>
      <div     
        data-aos="fade-up"
        data-aos-duration="900">
      <BestSeller/>
      </div>
      <div     
        data-aos="fade-up"
        data-aos-duration="900">
      <WhyChooseUs/>
      </div>
      <div     
        data-aos="fade-up"
        data-aos-duration="900">
      <TestimonialCarousel/>
      </div>
      <div     
        data-aos="fade-up"
        data-aos-duration="900">
      <PromoBar/>
      </div>
      <div     
        data-aos="fade-up"
        data-aos-duration="900">
      <LocationSection/>
      <Footer/>
      </div>
    </div>
  );
};

export default Home;
