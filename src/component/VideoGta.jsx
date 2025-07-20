import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const VideoGta = () => {
  const outerDivRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    if (!outerDivRef.current || !videoRef.current) return;

    // Detect if viewport is mobile or tablet
    const isMobileOrTablet = window.innerWidth <= 1024;

    gsap.fromTo(
      videoRef.current,
      { opacity: 0, scale: 10 },
      {
        opacity: 1,
        duration: 1,
        scale: isMobileOrTablet ? 5 : 1.5,
        ease: "expoScale(0.5,7,none)",
        scrollTrigger: {
          trigger: outerDivRef.current,
          start: "top 50%", // when outer-div is 30% from top of viewport
          end: "bottom 70%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      }
    );
  }, []);

  return (
    <div
      ref={outerDivRef}
      className="outer-div overflow-hidden bg-gray-800 h-screen relative w-full flex justify-center items-center -z-10"
    >
      <div className="w-full absolute bg-gradient-to-b z-20 from-black to-transparent top-0 left-0 h-[30%]"></div>
      <div className="w-full absolute bg-gradient-to-b z-20 from-transparent to-[#15131e]  bottom-0 left-0 h-[30%]"></div>
      <iframe
        ref={videoRef}
        className="main-video h-full w-full object-cover transition-all duration-500 rounded-2xl"
        style={{ opacity: 0, padding: "0%" }}
        src="https://www.youtube-nocookie.com/embed/QdBZY2fkU-0?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&start=20"
        allow="autoplay; encrypted-media; accelerometer; clipboard-write; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="GTA 6 Trailer"
      ></iframe>
    </div>
  );
};

export default VideoGta;
