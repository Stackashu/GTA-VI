import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

export const LenisProvider = ({ children }) => {
  const lenisRef = useRef(null);
  const [lenisInstance, setLenisInstance] = useState(null);

  useEffect(() => {
    // Always scroll to top on refresh/mount, and force it after a tick for Lenis
    window.scrollTo(0, 0);

    // Some browsers may delay scroll restoration, so force it after a tick
    setTimeout(() => {
      window.scrollTo(0, 0);
      // If Lenis is already initialized, force its scroll position to 0 as well
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }, 0);

    const lenis = new Lenis({
      duration: 1.5,
      smooth: true,
      smoothTouch: false,
    });
    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // After Lenis is initialized, force scroll to top again to ensure
    // both browser and Lenis are at scrollTop 0
    setTimeout(() => {
      lenis.scrollTo(0, { immediate: true });
    }, 10);

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (value !== undefined) {
          lenis.scrollTo(value);
        } else {
          // Use Lenis' internal value if available, else fallback
          return lenis.scroll && lenis.scroll.instance
            ? lenis.scroll.instance.scroll.y
            : window.scrollY;
        }
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    // update ScrollTrigger on scroll
    const updateScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", updateScrollTrigger);

    // Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
      //   ScrollTrigger.kill();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
};
