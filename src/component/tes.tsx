const Dumpbutton = () => {
    return (
      <div className="flex flex-col gap-4 items-center">
      {/* Button 1: Dashed Border Hover Effect */}
      <button className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
        Hover me
      </button>
      
      {/* Button 2: Smooth Slide In Background */}
      <button className="relative px-6 py-3 font-semibold uppercase text-black border-2 border-black overflow-hidden rounded-lg transition-all duration-500 before:absolute before:top-0 before:left-[-100%] before:h-full before:w-full before:bg-black before:transition-all before:duration-500 hover:before:left-0 hover:text-white">
        <span className="relative z-10">Smooth Slide</span>
      </button>
      
      {/* Button 3: Diagonal Slide In */}
      <button className="relative px-6 py-3 font-semibold uppercase text-black border-2 border-black overflow-hidden rounded-lg transition-all duration-500 before:absolute before:top-[-100%] before:left-[-100%] before:h-full before:w-full before:bg-black before:transition-all before:duration-500 hover:before:top-0 hover:before:left-0 hover:text-white">
        <span className="relative z-10">Diagonal Slide</span>
      </button>
      
      {/* Button 4: Right-to-Left Slide In */}
      <button className="relative px-6 py-3 font-semibold uppercase text-black border-2 border-black overflow-hidden rounded-lg transition-all duration-500 before:absolute before:top-0 before:right-[-100%] before:h-full before:w-full before:bg-black before:transition-all before:duration-500 hover:before:right-0 hover:text-white">
        <span className="relative z-10">Right Slide</span>
      </button>
      
      {/* Button 5: Circular Slide In */}
      <button className="relative px-6 py-3 font-semibold uppercase text-black border-2 border-black overflow-hidden rounded-lg transition-all duration-500 before:absolute before:top-1/2 before:left-1/2 before:h-0 before:w-0 before:bg-black before:rounded-full before:transition-all before:duration-500 hover:before:h-full hover:before:w-full hover:before:top-0 hover:before:left-0 hover:text-white">
        <span className="relative z-10">Circular Slide</span>
      </button>
      
      {/* Button 6: Bottom-to-Top Slide In */}
      <button className="relative px-6 py-3 font-semibold uppercase text-black border-2 border-black overflow-hidden rounded-lg transition-all duration-500 before:absolute before:bottom-[-100%] before:left-0 before:h-full before:w-full before:bg-black before:transition-all before:duration-500 hover:before:bottom-0 hover:text-white">
        <span className="relative z-10">Bottom Slide</span>
      </button>
    </div>
    );
  };
  
  export default Dumpbutton;
  