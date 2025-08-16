import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ComingSoon = () => {
  const sectionRef = useRef(null);
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !firstTextRef.current ||
        !secondTextRef.current
      )
        return;

      let startValue = "top 50%";
      const vw = window.innerWidth;
      if (vw <= 768) {
        startValue = "top 20%";
      }

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: startValue,
            end: "bottom 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          firstTextRef.current,
          { opacity: 0, y: 80 },
          { opacity: 1, y: -20, duration: 0.5, ease: "power2.out" }
        )
          .to(
            firstTextRef.current,
            { opacity: 0, y: -50, duration: 0.5, ease: "power2.inOut" }
          )
          .fromTo(
            secondTextRef.current,
            { opacity: 0, y: 80 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
          );
      }, sectionRef);

      return () => ctx.revert();
    },
    []
  );

  return (
    <div
      ref={sectionRef}
      className="w-full bg-[#15131e] relative h-screen overflow-hidden "
    >
      <div className="md:flex md:justify-center md:items-center md:w-full md:h-full">
        <div
          ref={firstTextRef}
          className="first-text lg:left-1/2 absolute sm:text-center  lg:-translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-9"
          style={{ opacity: 1 }}
        >
          <h1 className=" md:text-9xl text-5xl text-center font-bold bg-gradient-to-b from-pink-500 to-yellow-500 bg-clip-text text-transparent">
            COMING<br />MAY 26<br />2026
          </h1>
          <img className="w-[70%]" src="/ps5.png" />
        </div>
      </div>

      <div
        ref={secondTextRef}
        className="left-1/2 sm:w-screen text-center absolute -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col justify-center gap-9 second-text"
        style={{ opacity: 0 }}
      >
        <h1 className="text-4xl md:text-8xl font-bold bg-gradient-to-b from-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Vice City, USA.
        </h1>
        <div className="flex flex-col items-center w-full">
          <div className="relative w-full max-w-3xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-br from-pink-500/30 to-yellow-500/30 rounded-2xl blur-lg opacity-80 pointer-events-none"></div>
            <div className="relative z-10 bg-[#18152a] bg-opacity-90 rounded-2xl shadow-xl px-6 py-8 sm:px-10 sm:py-10 border border-pink-400/30 border-opacity-30">
              <p className="text-lg sm:text-2xl lg:text-3xl font-medium text-white leading-relaxed text-left sm:text-center">
                <span className="block mb-4">
                  <span className="font-bold text-pink-400">Jason</span> and <span className="font-bold text-yellow-400">Lucia</span> have always known the deck is stacked against them.
                </span>
                <span className="block mb-4">
                  But when an easy score goes wrong, they find themselves on the darkest side of the sunniest place in America,
                  in the middle of a criminal conspiracy stretching across the state of <span className="font-bold text-pink-300">Leonida</span> —
                </span>
                <span className="block">
                  forced to rely on each other more than ever if they want to make it out alive.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
