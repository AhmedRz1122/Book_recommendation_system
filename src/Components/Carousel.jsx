import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";
import { useEffect } from 'react';
import { initFlowbite } from 'flowbite';

const Carousel = () => {
  useEffect(() => {
    initFlowbite(); // Initialize Flowbite's JavaScript
  }, []);

  return (
    <div id="default-carousel" className="relative w-full h-full" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-full overflow-hidden ">
        {/* Item 1 - ACTIVE */}
        <div className="duration-700 ease-in-out" data-carousel-item>
          <img 
            src={image3} 
            className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" 
            alt="Slide 1" 
          />
        </div>
        {/* Item 2 */}
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img 
            src={image1} 
            className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" 
            alt="Slide 2" 
          />
        </div>
        {/* Item 3 */}
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img 
            src={image2} 
            className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" 
            alt="Slide 3" 
          />
        </div>
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button 
          type="button" 
          className="w-3 h-3 rounded-full bg-white/70 hover:bg-white" 
          aria-current="true" 
          aria-label="Slide 1" 
          data-carousel-slide-to="0"
        ></button>
        <button 
          type="button" 
          className="w-3 h-3 rounded-full bg-white/30 hover:bg-white" 
          aria-current="false" 
          aria-label="Slide 2" 
          data-carousel-slide-to="1"
        ></button>
        <button 
          type="button" 
          className="w-3 h-3 rounded-full bg-white/30 hover:bg-white" 
          aria-current="false" 
          aria-label="Slide 3" 
          data-carousel-slide-to="2"
        ></button>
      </div>

      {/* Slider controls */}
      <button 
        type="button" 
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button 
        type="button" 
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;