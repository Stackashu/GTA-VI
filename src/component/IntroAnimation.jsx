import { useGSAP } from "@gsap/react";
import React, { useEffect, useState } from "react";
import gsap from "gsap";

// Responsive font size calculation for SVG text
const getResponsiveFontSize = () => {
  if (typeof window === "undefined") return 120;
  const width = window.innerWidth;
  if (width < 480) return 250; // mobile
  if (width < 768) return 140; // tablet
  return 250; // desktop
};

const IntroAnimation = ({ setShowHeroSection }) => {
  const [fontSize, setFontSize] = useState(getResponsiveFontSize());

  useEffect(() => {
    // Update font size on resize for responsiveness
    const handleResize = () => {
      setFontSize(getResponsiveFontSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    const t1 = gsap.timeline();

    t1.to(".vi-mask-group", {
      rotate: 20,
      duration: 2,
      ease: "power4.easeInOut",
      transformOrigin: "50% 50%",
    });
    t1.to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.7,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.8) {
          document.querySelector(".svg").remove();
          setShowHeroSection(true);
          this.kill();
        }
      },
    });
  });

  return (
    <div
      className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        padding: 0,
        margin: 0,
      }}
    >
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: "100vw",
          height: "100vh",
          maxWidth: "100%",
          maxHeight: "100%",
          display: "block",
        }}
      >
        <defs>
          <mask id="viMask">
            <rect width="100%" height="100%" fill="black" />
            <g className="vi-mask-group">
              <text
                x="50%"
                y="50%"
                fontSize={fontSize}
                textAnchor="middle"
                fill="white"
                dominantBaseline="middle"
                fontFamily="Arial Black, Arial, sans-serif"
                style={{
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                VI
              </text>
            </g>
          </mask>
        </defs>
        <image
          href="./sky.png"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#viMask)"
        />
        <image
          href="./bg.png"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#viMask)"
          className="z-[4]"
        />
       
      </svg>
    </div>
  );
};

export default IntroAnimation;
