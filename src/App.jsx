import React, { useEffect, useState } from "react";
import IntroAnimation from "./component/IntroAnimation";
import LandingPage from "./component/LandingPage";

const App = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showHeroSection, setShowHeroSection] = useState(false);

  useEffect(() => {
    const images = document.images;
    let loadedCount = 0;

    const checkAllImagesLoaded = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setImagesLoaded(true);
      }
    };

    for (let img of images) {
      if (img.complete) {
        loadedCount++;
      } else {
        img.onload = checkAllImagesLoaded;
        img.onerror = checkAllImagesLoaded;
      }
    }

    if (loadedCount === images.length) {
      setImagesLoaded(true);
    }
  }, []);

  return (
    <>
      {imagesLoaded ? (
        <>
          <IntroAnimation setShowHeroSection={setShowHeroSection} />
          <div className="overflow-hidden">
            {showHeroSection && (
              <LandingPage showHeroSection={showHeroSection} />
            )}
          </div>
        </>
      ) : (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
          <svg
            width="64"
            height="64"
            viewBox="0 0 50 50"
            style={{
              display: "block",
              animation: "spin 1s linear infinite",
            }}
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="#fff"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="90"
              strokeDashoffset="60"
            />
            <style>
              {`
                @keyframes spin {
                  100% { transform: rotate(360deg); }
                }
                svg[style*="animation"] {
                  transform-origin: 50% 50%;
                }
              `}
            </style>
          </svg>
          <span className="mt-4 text-white text-lg font-semibold">
            Loading..
          </span>
        </div>
      )}
    </>
  );
};

export default App;
