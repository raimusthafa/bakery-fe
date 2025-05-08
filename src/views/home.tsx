import { FC, useEffect, useState, lazy, Suspense } from "react";
import { useAuthStore } from "../store/auth";
import DrawCircleText from "../component/drawtext";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS Styles
import { Link } from "react-router-dom";

// Lazy load komponen besar
const BestSeller = lazy(() => import("../component/home/bestseller"));
const WhyChooseUs = lazy(() => import("../component/home/service"));
const TestimonialCarousel = lazy(() => import("../component/home/review"));
const PromoBar = lazy(() => import("../component/home/newsletter"));
const LocationSection = lazy(() => import("../component/home/loaction"));
const Footer = lazy(() => import("../component/home/footer"));

export const Home: FC = () => {
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init();

    if (token && !user) {
      setLoading(true);
      fetchUser().finally(() => setLoading(false));
    }
  }, [token, user, fetchUser]);

  return (
    <div className="bg-[#FFF8F1]">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="relative h-screen">
          <img
            src="/img/bg-bakery.webp" // Disarankan simpan di folder public
            alt="Background"
            className="w-full h-screen object-cover"
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40">
            <div className="text-center p-8 max-w-4xl">
              <div className="animate-fade-in delay-200">
                <div className="-mb-14">
                  <DrawCircleText />
                </div>
                <div className="w-20 mx-auto">
+                  <img src="/img/scroll5.gif" alt="Scroll down"/>
                 </div>
              </div>
              {!user && (
                <div className="mt-8 animate-fade-in delay-300">
                  {/* Bisa tambahkan tombol call to action di sini */}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Auth Greeting */}
        {token && (
          <>
            {loading && (
              <p className="text-center text-gray-500">
                Memuat data pengguna...
              </p>
            )}
            {user && (
              <div className="flex justify-center">
                <div className="p-5 mt-5 mb-4 bg-gray-100 rounded-2xl shadow-lg">
                  <div className="py-5 text-center">
                    <h1 className="text-4xl font-bold">Halo, {user.name}!</h1>
                    <p className="text-lg max-w-2xl mx-auto">{user.email}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Lazy-loaded components with AOS Animations */}
        <Suspense fallback={<div className="text-center my-10">Memuat...</div>}>
          <div data-aos="fade-up" data-aos-duration="900">
            <BestSeller />
          </div>
          <div data-aos="fade-up" data-aos-duration="900">
            <WhyChooseUs />
          </div>
          <div data-aos="fade-up" data-aos-duration="900">
            <TestimonialCarousel />
          </div>
          <div data-aos="fade-up" data-aos-duration="900">
            <PromoBar />
          </div>
          <div data-aos="fade-up" data-aos-duration="900">
            <LocationSection />
            <Footer />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
