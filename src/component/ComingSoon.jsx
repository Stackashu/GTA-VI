import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ComingSoon = () => {
  const sectionRef = useRef(null);
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  // Use a single GSAP context for efficient cleanup and to avoid memory leaks
  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !firstTextRef.current ||
        !secondTextRef.current
      )
        return;

      let startValue = "top 50%"
      const vw = window.innerWidth
      if(vw<=768){
        startValue = "top 20%"
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
            { opacity: 0, y: -50, duration: 0.5, ease: "power2.inOut" },
            
          )
          .fromTo(
            secondTextRef.current,
            { opacity: 0, y: 80 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
            
          );
      }, sectionRef);

      return () => ctx.revert();
    },
    [],
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
        className=" left-1/2 sm:w-screen text-center absolute -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col justify-center  gap-9 second-text  bg-gradient-to-b from-pink-500 to-yellow-500 bg-clip-text text-transparent"
        style={{ opacity: 0 }}
      >
        <h1 className="text-4xl md:text-8xl font-bold">Vice City, USA.</h1>
        <h1 className="text-1xl  sm:text-2xl lg:text-4xl font-medium">
          Jason and Lucia have always known the deck is stacked against
          them. But when an easy score goes wrong, they find themseleves on
          teh darkest side of yhe sunniest place in America, in the middle
          of a criminal conspiracy stretching across the state of Leonida -
          forced to rely on each other more than evr if they want to make it out live.
        </h1>
      </div>

     
    </div>
  );
};

export default ComingSoon;
