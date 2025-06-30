import React, { useState, useEffect } from 'react'
import IntroAnimation from './component/IntroAnimation';
import LandingPage from './component/LandingPage';

// List of all images to preload (relative to public/)
const imagesToPreload = [
  '/sky.png',
  '/bg.png',
  '/gta6Text.png',
  '/girlbg.png',
  '/ps5.png',
  '/logo18.png',
];

const preloadImages = (srcArray) => {
  return Promise.all(
    srcArray.map(
      (src) =>
        new Promise((resolve) => {
          const img = new window.Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        })
    )
  );
};

const App = () => {
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [showHeroSection, setShowHeroSection] = useState(false);

  useEffect(() => {
    let isMounted = true;
    preloadImages(imagesToPreload).then(() => {
      if (isMounted) setAllImagesLoaded(true);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Show a loading spinner while images are loading
  if (!allImagesLoaded) {
    return (
      <div
        className="flex flex-col items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]"
        style={{ minHeight: '100vh', minWidth: '100vw', padding: 0, margin: 0 }}
      >
        <div className="mb-4">
          <span
            style={{
              display: 'inline-block',
              width: '48px',
              height: '48px',
              border: '6px solid #fff',
              borderTop: '6px solid #888',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
        <div className="text-white text-lg font-semibold tracking-wide">Loading ...</div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}</style>
      </div>
    );
  }

  // Always render both components
  return (
    <div>
      <IntroAnimation setShowHeroSection={setShowHeroSection} showHeroSection={showHeroSection} />
      <div className="overflow-hidden">
        <LandingPage showHeroSection={showHeroSection} />
      </div>
    </div>
  );
}

export default App