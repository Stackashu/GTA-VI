import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AllCharacters = () => {
  const wrapperRef = useRef(null);
  const mainImgRef = useRef(null);

  useEffect(() => {
    gsap.to(".boatBoy", {
      yoyo: true,
      y: 10,
      duration: 1.5,
      repeat: -1,
      ease: "power1.inOut",
    });
    gsap.to(".barGirl", {
      yoyo: true,
      x: 5,
      duration: 1.5,
      repeat: -1,
      ease: "power1.inOut",
    });

    // If you want to animate the main image scale without ScrollTrigger, you could do it here
    // For now, we just leave it at its default scale

    // No cleanup needed since no ScrollTrigger is used
  }, []);

  // Utility style for making images unselectable and unclickable
  const imgStyle = {
    userSelect: "none",
    pointerEvents: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  };

  return (
    <div ref={wrapperRef} className="w-full h-screen relative wrapper overflow-hidden wrapper ">
      <div className="w-full absolute bg-gradient-to-b z-1 from-[#15131e] to-transparent top-0 left-0 h-[40%]"></div>
      <div className="w-full absolute bg-gradient-to-b z-1 from-transparent to-[#15131e]  bottom-0 left-0 h-[40%]"></div>
      <img
        ref={mainImgRef}
        className="h-full w-full object-cover scale-[1.8] main select-none pointer-events-none"
        src="/gtaPic/gtaTheme.webp"
        alt=""
        style={imgStyle}
        draggable={false}
      />
      <img
        className="absolute bottom-0 left-[-2%] barGirl select-none pointer-events-none"
        src="/gtaPic/barGirls.webp"
        alt="fdfd"
        style={imgStyle}
        draggable={false}
      />
      <img
        className="absolute bottom-0 z-1 right-0 boatBoy select-none pointer-events-none"
        src="/gtaPic/boatBoy.webp"
        alt="fdfd"
        style={imgStyle}
        draggable={false}
      />
      <img
        className="absolute bottom-0 left-[-5%] buisness select-none pointer-events-none"
        src="/gtaPic/buisnessMan.webp"
        alt="fdfd"
        style={imgStyle}
        draggable={false}
      />
      <img
        className="absolute bottom-0 z-0 right-[15%] clubMaster select-none pointer-events-none"
        src="/gtaPic/clubMaster.webp"
        alt="fdfd"
        style={imgStyle}
        draggable={false}
      />
    </div>
  );
};

export default AllCharacters;
