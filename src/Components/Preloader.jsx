import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
const Preloader = () => {
      const cuttingLine = useRef(null);
      const listenRef = useRef(null);
      const musicRef = useRef(null);
      const leftDiv = useRef(null);
      const rightDiv = useRef(null);
      const container = useRef(null);
      useGSAP(() => {
            const tl = gsap.timeline({ defaults: { ease: "power1.inOut", duration: 1.1 }, onComplete: () => gsap.set(container.current, { scale: 0 }) });
            tl.to(listenRef.current, {
                  y: 0,
            })
                  .to(
                        musicRef.current,
                        {
                              y: 0,
                        },
                        "<"
                  )
                  .to(cuttingLine.current, { scaleY: 1 }, "-=0.8")
                  .to(cuttingLine.current, { autoAlpha: 0 })
                  .to(listenRef.current, { y: "2.5rem" }, "-=.7")
                  .to(musicRef.current, { y: "-2.5rem" }, "<")
                  .to(leftDiv.current, {
                        scaleY: 0,
                        ease: "expo.inOut",
                  })
                  .to(rightDiv.current, { scaleY: 0, ease: "expo.inOut" }, "-=0.95");
      });
      return (
            <div ref={container} className="w-full h-full flex absolute top-0 z-50 left-0">
                  {/* Line Cut */}
                  <div ref={cuttingLine} className="absolute origin-top scale-y-0 top-0 z-50 left-1/2 -translate-x-1/2 w-[1px] rounded-full h-full gradient "></div>
                  {/* Left Div */}
                  <div ref={leftDiv} className="w-1/2 origin-top h-full flex justify-end pr-1 items-center  bg-zinc-800">
                        <div className="overflow-hidden pl-1">
                              <h2 ref={listenRef} className="text-2xl sm:text-4xl -translate-y-10 text-zinc-200  font-Secondary leading-none tracking-tighter">
                                    Listen
                              </h2>
                        </div>
                  </div>
                  {/* Right Div */}
                  <div ref={rightDiv} className="w-1/2 origin-top h-full flex items-center pl-1 bg-zinc-800">
                        <div className="overflow-hidden pr-1 ">
                              <h2 ref={musicRef} className="text-2xl sm:text-4xl translate-y-10 text-zinc-200 font-Secondary leading-none tracking-tighter">
                                    Music
                              </h2>
                        </div>
                  </div>
            </div>
      );
};

export default Preloader;
