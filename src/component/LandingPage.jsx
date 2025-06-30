import { useGSAP } from "@gsap/react";
import React from "react";
import gsap from "gsap";

const LandingPage = ({showHeroSection}) => {
  useGSAP(() => {
    if (!showHeroSection) return;
    const mM = gsap.matchMedia();

    gsap.to(".main", {
      rotate: 0,
      scale: 1,
      duration: 2,
      ease: "Expo.easeInOut",
      delay: -1,
    });

    gsap.to(".sky", {
      scale: 1.3,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".building", {
      scale: 1.3,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".gtaText", {
      rotate: 0,
      top: "5%",
      duration: 2,
      scale: 1,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });
    // for text when the max width is below tablet view
    mM.add("(max-width:768px)", () => {
      gsap.to(".gtaText", {
        rotate: 0,
        top: "30%",
        duration: 2,
        scale: 1.8,
        delay: -0.8,
        ease: "Expo.easeInOut",
      });
    });

    mM.add("(max-width:480px)", () => {
      gsap.to(".gtaText", {
        rotate: 0,
        top: "40%",
        duration: 2,
        scale: 1.8,
        delay: -0.8,
        ease: "Expo.easeInOut",
      });
    });

    gsap.to(".girl", {
      scale: 0.9,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });
    // for girl according to media query
    mM.add("(max-width:768px)", () => {
      gsap.to(".girl", {
        scale: 0.9,
        rotate: 0,
        bottom: "-45%",
        duration: 2,
        delay: -0.8,
        ease: "Expo.easeInOut",
        // x: "-50%",
      });
    });
    mM.add("(max-width:480px)", () => {
      gsap.to(".girl", {
        scale: 0.9,
        rotate: 0,
        bottom: "-25%",
        duration: 2,
        delay: -0.8,
        ease: "Expo.easeInOut",
        // x: "-50%",
      });
    });
    gsap.to(".girl", {
      yoyo: true,
      y: 10,
      duration: 1.1,
      repeat: -1,
      ease: "sine",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 10;
      gsap.to(".main .sky", {
        x: `${-xMove * 0.4}%`,
      });
      gsap.to(".main .building", {
        x: `${-xMove * 0.4}%`,
      });
      gsap.to(".main .gtaText", {
        x: `${-xMove * 1.3}%`,
      });
    });
  }, [showHeroSection]);
  return (
    <div className="main overflow-hidden z-10 w-full rotate-[-15deg] scale-[1.4]  ">
      <div className="landing w-full relative h-screen bg-black  overflow-hidden">
        
        {/* this is for navBar  */}
        <div className="nav w-full z-[10] p-5  sm:p-10    absolute top-0 left-0 ">
          <div className="flex gap-4 sm:gap-7   ">
            <div className="lines flex sm:gap-[7px] flex-col gap-[5px]">
              <div className="w-8   h-[3px] sm:h-1 bg-white"></div>
              <div className="w-6  h-[3px] sm:h-1 sm:w-8 bg-white"></div>
              <div className="w-3  h-[3px] sm:h-1 sm:w-5 bg-white"></div>
            </div>

            <h3 className="text-2xl sm:text-4xl font-bold tracking-wide  sm:-mt-[5px]  leading-none text-white">
              ROCKSTAR
            </h3>
          </div>
        </div>

        {/* this is photo container */}
        <div className="relative overflow-hidden left-0 top-0 w-full h-screen">
          {/* sky image  */}
          <img
            className="sky absolute rotate-[-30deg] scale-[1.8] object-cover top-0 left-0 w-full h-screen"
            src="/sky.png"
            loading="lazy"
          />
          {/* building image  */}
          <img
            className=" building absolute scale-[1.8] rotate-[-3deg] object-cover top-0 left-0 w-full h-screen"
            src="/bg.png"
            loading="lazy"
          />
          {/* gta text  */}
          <img
            className="gtaText absolute scale-[1.5] top-[-100%] rotate-[-15deg] w-[45%] left-1/2 -translate-x-1/2"
            src="/gta6Text.png"
            loading="lazy"
          />
          {/* girl image  */}
          <img
            className=" girl absolute left-[50%] rotate-[-100deg]   -translate-x-1/2 scale-[3] mt-[10%]  "
            src="/girlbg.png"
            loading="lazy"
          />
        </div>

        {/* last box  */}
        <div className="w-full absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent">
          <div className="bottmBar flex relative justify-start p-7  items-center  ">
            <div
              className="
              bottom-15
              left-1/2 -translate-x-1/2 
              sm:translate-x-[100%] sm:bottom-[200%]
              md:left-[1%] md:translate-x-[5%] md:bottom-4
              flex items-center 
              justify-center 
              border-3 border-white 
              rounded-full 
              px-3 py-2 sm:px-5 sm:py-2  
              cursor-pointer 
               absolute 
               transition-all duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="arrow-down animate-bounce w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12"
                style={{ animationDuration: "2.5s" }}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>

              <button className="text-white cursor-pointer mb-1 text-md   sm:text-md md:text-2xl font-extrabold sm:font-medium px-3 py-1 sm:px-4 sm:py-2 transition-all duration-200">
                Scroll Down
              </button>
            </div>
            <img
              className="
                w-[55%]  md:w-[35%]
                absolute
                left-[3%]  md:left-1/2
                md:-translate-x-1/2
                md:bottom-0"
              src="/ps5.png"
              alt="PS5"
              loading="lazy"
            />


            <img
              className="absolute w-[9%] sm:w-[150%] md:w-[4%] right-5  md:right-10 md:bottom-3" 
              src="/logo18.png"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
