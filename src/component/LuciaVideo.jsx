import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 31;
const images = [];

for (let i = 0; i < FRAME_COUNT; i++) {
  const paddedNumber = String(i + 1).padStart(3, "0");
  images.push(`/Lucia/ezgif-frame-${paddedNumber}.jpg`);
}

const LuciaScrollCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imageSectionRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState([]);

  // For smooth frame interpolation
  const lastFrameRef = useRef(0);
  const animFrameRef = useRef();

  useEffect(() => {
    const loadImages = async () => {
      const imgElements = await Promise.all(
        images.map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = () => resolve(img);
            })
        )
      );
      setLoadedImages(imgElements);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!loadedImages.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size and update on resize for responsiveness
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Smooth frame value for interpolation
    let targetFrame = 0;
    let currentFrame = 0;

    // Render function
    const render = (index) => {
      const img = loadedImages[index];
      if (!img) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dpr = window.devicePixelRatio || 1;
      const canvasWidth = canvas.width / dpr;
      const canvasHeight = canvas.height / dpr;

      // Responsive logic: if viewport width <= 768px, fill height and center horizontally
      if (window.innerWidth <= 768) {
        // Scale image so its height fills the canvas
        const scale = canvasHeight / img.height;
        const drawWidth = img.width * scale;
        const x = (canvasWidth - drawWidth) / 2;
        ctx.drawImage(img, x, 0, drawWidth, canvasHeight);
      } else {
        // Default: fill width, center vertically
        const scale = canvasWidth / img.width;
        const drawHeight = img.height * scale;
        const y = (canvasHeight - drawHeight) / 2;
        ctx.drawImage(img, 0, y, canvasWidth, drawHeight);
      }
    };

    // GSAP object for scroll-driven frame
    const obj = { frame: 0 };

    // Animation loop for smooth interpolation
    const animate = () => {
      currentFrame += (targetFrame - currentFrame) * 0.15;
      const frameIndex = Math.round(currentFrame);
      if (frameIndex !== lastFrameRef.current) {
        render(frameIndex);
        lastFrameRef.current = frameIndex;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    // GSAP scroll trigger to update targetFrame
    const scrollTween = gsap.to(obj, {
      frame: FRAME_COUNT - 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
      },
      onUpdate: () => {
        targetFrame = obj.frame;
      },
    });

    // Initial render
    render(0);
    lastFrameRef.current = 0;
    currentFrame = 0;
    targetFrame = 0;
    animFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (scrollTween) scrollTween.scrollTrigger && scrollTween.scrollTrigger.kill();
    };
  }, [loadedImages]);

  useEffect(() => {
    const images = imageSectionRef.current.querySelectorAll(".fade-img");

    images.forEach((img, i) => {
      gsap.fromTo(
        img,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger:0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
            end: "top 50%",
            scrub: true, // makes the animation tied to scroll
            // markers: true, // uncomment for debugging
          },
        }
      );
    });
  }, []);

  // Responsive image positions and sizes
  // We'll use Tailwind's responsive classes and a little inline style for some fine-tuning

  return (
    <>
      {/* Scroll Canvas Section */}
      <div
        ref={containerRef}
        className="relative w-full h-[250vh] bg-black"
      >
        <canvas
          ref={canvasRef}
          className="
            sticky top-0 left-0 w-screen h-screen md:h-100vh
            overflow-hidden object-fill
            "
          style={{
            width: "100vw",
            height: "100vh",
            maxWidth: "100vw",
            maxHeight: "100vh",
            display: "block",
          }}
        />

        <div
          className="
            absolute w-screen h-[150vh]
            bg-gradient-to-b from-transparent via-[#191920] to-[#15131e]
            overflow-hidden
            pointer-events-none
          "
        >
          {/* image wrapper div  */}
          <div ref={imageSectionRef} className="relative w-full h-full">
            {/* Party Girl */}
            <div
              className={`
                fade-img absolute
                -translate-x-0
                h-[60vh] w-[20vw]
                lg:top-150 lg:w-[30%] lg:left-60 lg:h-[100vh]
                lg:hover:p-2 bg-amber-100 transition-all duration-[500ms] ease-in
                md:top-270 md:w-[100vw] md:h-[70vh] md:left-5 md:-translate-x-0
                sm:top-[40vh] sm:w-[60vw] sm:h-[40vh] sm:left-1/1 sm:translate-x-1/2 
                
              `}
              style={{
                // On mobile, override with inline style for top/width/height
                // Tailwind's sm: and md: will handle tablet/desktop
                // This ensures mobile is always at the bottom center
                // Desktop: left 30%, top-96, w-30vw, h-100vh
                // Tablet: left-1/2, top-40vh, w-60vw, h-40vh
                // Mobile: left-1/2, top-30vh, w-80vw, h-30vh
              }}
            >
              <img
                className="h-full w-full object-cover transition-all duration-[500ms] ease-in"
                src="./gtaPic/partygirl.webp"
                alt="girl"
                draggable={false}
              />
            </div>
            {/* Girls Swim */}
            <div
              className={`
                fade-img absolute 
                right-0
                h-[50vh] lg:h-[100vh]
                w-[30vw] lg:w-[50vw]
                lg:top-250
                hover:p-2 bg-amber-100 transition-all duration-[500ms] ease-in
                md:right-0 md:top-[250px] md:w-[50vw] md:h-[50vh]
                sm:right-0 sm:top-[60vh] sm:w-[70vw] sm:h-[30vh]
                top-[60%]  
                hidden sm:block
              `}
              style={{
                // Desktop: right-0, top-250, w-50vw, h-50vh
                // Tablet: right-0, top-60vh, w-70vw, h-30vh
                // Mobile: right-0, top-60vh, w-90vw, h-20vh
              }}
            >
              <img
                className="h-full w-full object-cover transition-all duration-[500ms] ease-in"
                src="./gtaPic/girsSwim.webp"
                alt="girl"
                draggable={false}
              />
            </div>
            {/* Car Boy */}
            <div
              className={`
                fade-img absolute
                right-0
                h-[50vh] lg:h-[100vh] w-[70vw]
                lg:w-1/2 
                top-0
                hover:p-2 bg-amber-100 transition-all duration-[500ms] ease-in
                md:right-0 md:top-0  md:h-[100vh]
                sm:right-0 sm:top-0 sm:w-[70vw] sm:h-[40vh]
              `}
              style={{
                // Desktop: right-0, top-0, w-1/2, h-100vh
                // Tablet: right-0, top-0, w-60vw, h-40vh
                // Mobile: right-0, top-0, w-90vw, h-25vh
              }}
            >
              <img
                className="h-full w-full object-cover transition-all duration-[500ms] ease-in"
                src="./gtaPic/carBoy.webp"
                alt="boy"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LuciaScrollCanvas;
