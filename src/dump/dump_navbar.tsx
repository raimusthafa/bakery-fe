import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import LoginLogoutButton from "../component/authbutton";

export const SlideTabsExample = () => {
  return (
<div className="grid grid-cols-3 items-center bg-[#A27B5C] py-2">
  <div className="pl-4">
    <img src="https://png.pngtree.com/png-vector/20210302/ourmid/pngtree-letter-b-logo-png-image_2978086.jpg" 
    alt="" 
    className="w-10 h-10"/>
  </div> {/* Kiri */}
  <div className="flex justify-center"> <SlideTabs /> </div> {/* Tengah */}
  <div className="pr-4 text-right">
  <LoginLogoutButton />  
  </div> {/* Kanan */}
</div>


  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-white p-1"
    >
      <Tab setPosition={setPosition} to="/">Home</Tab>
      <Tab setPosition={setPosition} to="/products">Products</Tab>
      <Tab setPosition={setPosition} to="/features">Features</Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({
  to,
  children,
  setPosition,
}: {
  to: string;
  children: string;
  setPosition: Dispatch<SetStateAction<Position>>;
}) => {
  const ref = useRef<null | HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white md:px-5 md:py-3 md:text-base"
    >
      <Link to={to}>{children}</Link>
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-yellow-600 md:h-12"
    />
  );
};

type Position = {
  left: number;
  width: number;
  opacity: number;
};
