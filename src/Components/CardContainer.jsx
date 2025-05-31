import Card from "./Card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const CardContainer = () => {
      const sect1Ref = useRef(null);
      const sect2Ref = useRef(null);
      const sect3Ref = useRef(null);
      useGSAP(() => {
            let tl = gsap.timeline({ defaults: { duration: 0.8, ease: "expo.out" } });
            tl.from(sect1Ref.current, {
                  scaleY: 0,
                  transformOrigin: "bottom bottom",
            })
                  .from(sect2Ref.current, {
                        scaleX: 0,
                        transformOrigin: "left left",
                  })
                  .from(sect3Ref.current, {
                        scale: 1.2,
                        opacity: 0,
                  });
      });
      return (
            <section className="w-full  sm:flex sm:justify-center sm:items-center sm:w-1/2   relative h-[55%]">
                  <section ref={sect1Ref} className="absolute w-[70%] 2xl:w-[55%] lg:left-[55%] xl:left-[60%]  left-1/2 -translate-y-1/2 -translate-x-1/2 top-[46%] sm:top-[50%] rounded-md bg-white/30 lg:h-80 sm:h-64  h-72"></section>
                  <section ref={sect2Ref} className="absolute w-3/4 2xl:w-[60%] lg:left-[55%] xl:left-[60%]  left-1/2 -translate-y-1/2 -translate-x-1/2 top-[48%] sm:top-[52%] rounded-md bg-white/40 lg:h-80 sm:h-64  h-72"></section>
                  <Card imageAnim={sect3Ref} />
            </section>
      );
};

export default CardContainer;
