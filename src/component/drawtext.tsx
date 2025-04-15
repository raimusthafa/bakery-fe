import React from "react";
import { motion } from "framer-motion";

export const DrawCircleText: React.FC = () => {
  return (
    <div className="w-full -mt-7">
      <div className="grid place-content-center py-24 text-yellow-50 text-center font-[Playfair_Display]">
      {/* Bagian atas */}
      <h1 className="text-5xl font-semibold">Lezat, Lembut & Fresh Setiap Hari</h1>

      {/* Bagian bawah */}
      <h2 className="relative text-5xl font-semibold mt-2">
        <span className="inline-block mr-3">Bakery</span>
        <svg
        viewBox="0 0 300 80"
        fill="none"
        className="absolute -left-2 -right-2 top-0 bottom-0 -translate-y-2 translate-x-[135px] w-[190px] h-[60px] "
        >
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
            d="M150 2C112 18 8 10 2 50C-2 78 34 80 130 78C226 76 332 77 290 42C242 2 102 28 55 2"
            stroke="#FACC15"
            strokeWidth={3}
          />
        </svg>
        Pilihan Anda!
      </h2>
    </div>
    </div>
    
  );
};

export default DrawCircleText;
